import * as dotenv from 'dotenv';
import * as fs from 'fs';

const env = process.env.NODE_ENV || 'local';
const envFilePath = `.env.${env}`;
const exists = fs.existsSync(envFilePath);

if (exists) {
  dotenv.config({ path: envFilePath });
} else {
  dotenv.config();
}
export { envFilePath };
