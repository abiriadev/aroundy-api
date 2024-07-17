import { ConfigService } from '@/config/config.service';
import { ExtendedPrismaService } from '@/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { App, initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  private app: App;

  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
    private authConfigService: ConfigService.Auth,
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
    if (!decodedToken) return { auth: false, role: Role.Unknown, uid: '' };

    // update `recentlyLoggedInAt` field after successful signin
    await this.prismaService.client.user.update({
      where: { uid: decodedToken.uid },
      data: { recentlyLoggedInAt: new Date() },
    });

    // return the role of the user from custom claims
    // if the user has no role, return 'user' role

    if (decodedToken.role === 'admin') {
      return { auth: true, role: Role.Admin, uid: decodedToken.uid };
    } else if (decodedToken.role === 'biz') {
      return { auth: true, role: Role.Biz, uid: decodedToken.uid };
    } else {
      return { auth: true, role: Role.User, uid: decodedToken.uid };
    }
  }
}
