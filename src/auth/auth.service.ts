import { ConfigService } from '@/config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private authConfigService: ConfigService.Auth) {}

  // TODO: use firebase admin SDK to actually verify the token
  // also, it should know which role the user has then return it
  verifyToken(_token: string) {
    const { firebaseClientId } = this.authConfigService;

    // NOTE: don't forget to update `recentlyLoggedInAt` field after successful signin!

    return true;
  }
}
