// src/auth/auth.middleware.ts
import { RequestHandler } from '@nestjs/common/interfaces';
import * as basicAuth from 'express-basic-auth';

export function AuthMiddleware(): RequestHandler {
  const SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD;
  return basicAuth({
    users: { admin: SWAGGER_PASSWORD },
    challenge: true,
  });
}
