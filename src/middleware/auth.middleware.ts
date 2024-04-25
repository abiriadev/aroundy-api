// src/auth/auth.middleware.ts
import { RequestHandler } from '@nestjs/common/interfaces';
import * as basicAuth from 'express-basic-auth';

export function AuthMiddleware(): RequestHandler {
  const DOC_PASSWORD = process.env.DOC_PASSWORD;
  return basicAuth({
    users: { admin: DOC_PASSWORD },
    challenge: true,
  });
}
