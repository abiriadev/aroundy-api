import jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthTokenType, UserTokenBaseType } from './types/common.type';

@Injectable()
export class CommonService {
  constructor(private configService: ConfigService) {}
  private SESSION_SECRET = this.configService.get('SESSION_SECRET');

  async creatToken({
    username,
    id,
  }: UserTokenBaseType): Promise<AuthTokenType> {
    return new Promise((resolve, reject) => {
      const data = {
        username,
        id,
      };
      try {
        const token = jwt.sign(data, this.SESSION_SECRET, {
          expiresIn: '30d',
          issuer: 'weblab__issuer',
          subject: 'userInfo',
        });

        const refreshToken = jwt.sign(data, this.SESSION_SECRET, {
          expiresIn: '365d',
          issuer: 'weblab__issuer',
          subject: 'userInfo',
        });
        resolve({ token, refreshToken });
      } catch (error) {
        reject(error.message);
      }
    });
  }
}
