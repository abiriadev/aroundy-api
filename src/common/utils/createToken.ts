import * as jwt from 'jsonwebtoken';
const SESSION_SECRET = process.env.SESSION_SECRET;

export default function createToken({ username }: { username: string }) {
  return new Promise((resolve, reject) => {
    const data = {
      username,
    };

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
  });
}
