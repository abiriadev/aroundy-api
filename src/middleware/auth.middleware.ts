import { RequestHandler } from '@nestjs/common/interfaces';
import * as basicAuth from 'express-basic-auth';

export function AuthMiddleware(): RequestHandler {
  return basicAuth({
    users: { admin: '1234' },
    challenge: true,
  });
}
