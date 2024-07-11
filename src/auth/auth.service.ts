import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // TODO: use firebase admin SDK to actually verify the token
  // also, it should know which role the user has then return it
  verifyToken(_token: string) {
    return true;
  }
}
