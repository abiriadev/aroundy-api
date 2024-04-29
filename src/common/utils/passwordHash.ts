import * as crypto from 'crypto';

const mysalt = process.env.SESSION_SECRET;

export default function passwordHash(password: string): string {
  return crypto
    .createHash('sha512')
    .update(password + mysalt)
    .digest('base64');
}
