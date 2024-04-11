import { Injectable } from '@nestjs/common';

import { AuthTokenType } from './types/common.type';

@Injectable()
export class CommonService {
  constructor() {}

  async creatToken(): Promise<AuthTokenType> {
    return new Promise((resolve, reject) => {
      const data = {
        username,
        id,
        _id,
      };
      try {
        const token = jwt.sign(data, SESSION_SECRET, {
          expiresIn: '30d',
          issuer: 'weblab__issuer',
          subject: 'userInfo',
        });

        const refreshToken = jwt.sign(data, SESSION_SECRET, {
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
