import { ConfigService } from '@/config/config.service';
import { ExtendedPrismaService } from '@/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { App, initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { Role } from './roles.enum';
import { createHash } from 'crypto';
import { firstValueFrom } from 'rxjs';

export interface KakaoUser {
  id: number;
  expires_in: number;
  app_id: number;
}

export interface NaverUser {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname: string;
    name: string;
    email: string;
    gender: string;
    age: string;
    birthday: string;
    profile_image: string;
    birthyear: string;
    mobile: string;
  };
}

@Injectable()
export class AuthService {
  private app: App;
  private static KAKAO_API_URL =
    'https://kapi.kakao.com/v1/user/access_token_info';
  private static NAVER_API_URL = 'https://openapi.naver.com/v1/nid/me';

  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
    private authConfigService: ConfigService.Auth,
    private readonly httpService: HttpService,
  ) {
    this.app = initializeApp({
      credential: credential.cert(this.authConfigService.credential),
    });
  }

  // also, it should know which role the user has then return it
  async verifyToken(
    _token: string,
  ): Promise<{ auth: boolean; role: Role; uid: string }> {
    const decodedToken = await getAuth(this.app).verifyIdToken(_token);
    const user = await getAuth(this.app).getUser(decodedToken.uid);
    const role = user.customClaims?.role;

    if (!decodedToken) return { auth: false, role: Role.Unknown, uid: '' };

    // update `recentlyLoggedInAt` field after successful signin
    await this.prismaService.client.user.update({
      where: { uid: decodedToken.uid },
      data: { recentlyLoggedInAt: new Date() },
    });

    // return the role of the user from custom claims
    // if the user has no role, return 'user' role

    if (role === 'admin') {
      return { auth: true, role: Role.Admin, uid: decodedToken.uid };
    } else if (role === 'biz') {
      return { auth: true, role: Role.Biz, uid: decodedToken.uid };
    } else {
      return { auth: true, role: Role.User, uid: decodedToken.uid };
    }
  }

  generateUidHash(input: string): string {
    let hash = createHash('sha256').update(input).digest('base64');
    hash = hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return hash.substring(0, 28);
  }

  async createUser(uid: string): Promise<void> {
    // if user exists, return
    const auth = getAuth(this.app);
    const user = await auth.getUser(uid).catch(() => null);
    if (user) return;

    // create user
    await auth.createUser({
      uid,
    });

    // set custom claims
    await getAuth(this.app).setCustomUserClaims(uid, {
      role: 'user',
    });

    // create user in database
    this.prismaService.client.user.create({
      data: {
        uid,
        oauthProvider: 'custom',
        recentlyLoggedInAt: new Date(),
      },
    });
  }

  async getKakaoUser(kakaoToken: string): Promise<string> {
    console.log(kakaoToken);
    const res = await firstValueFrom(
      this.httpService.get<KakaoUser>(AuthService.KAKAO_API_URL, {
        headers: {
          Authorization: `Bearer ${kakaoToken}`,
        },
      }),
    ).catch(() => {
      return { data: { id: '' } };
    });

    if (res.data.id) {
      const uid = this.generateUidHash(res.data.id.toString());
      await this.createUser(uid);
      return uid;
    } else {
      return '';
    }
  }

  async getNaverUser(naverToken: string): Promise<string> {
    // get user id from naver
    const res = await firstValueFrom(
      this.httpService.get<NaverUser>(AuthService.NAVER_API_URL, {
        headers: {
          Authorization: `Bearer ${naverToken}`,
        },
      }),
    ).catch(() => {
      return { data: { response: { id: '' } } };
    });

    if (res.data.response.id) {
      const uid = this.generateUidHash(res.data.response.id);
      this.createUser(uid);
      return uid;
    } else {
      return '';
    }
  }

  async createCustomToken(uid: string): Promise<string> {
    if (!uid) return '';
    return getAuth(this.app).createCustomToken(uid);
  }
}
