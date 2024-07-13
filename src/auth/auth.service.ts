import { ConfigService } from '@/config/config.service';
import { Injectable } from '@nestjs/common';
import { initializeApp, App } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  private app: App;

  constructor(private authConfigService: ConfigService.Auth) {
    const credentials = this.authConfigService.credential;
    this.app = initializeApp({
      credential: credential.cert(credentials),
    });
  }

  // TODO: use firebase admin SDK to actually verify the token
  // also, it should know which role the user has then return it
  async verifyToken(_token: string) {
    const decodedToken = await getAuth(this.app).verifyIdToken(_token);
    if (!decodedToken) return false;

    // NOTE: don't forget to update `recentlyLoggedInAt` field after successful signin!

    return true;
  }
}
