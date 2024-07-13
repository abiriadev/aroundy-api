import {
  MinLength,
  IsString,
  IsObject,
  IsArray,
  IsEnum,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export namespace ConfigService {
  export class App {
    @IsEnum(LogLevel)
    level: LogLevel = LogLevel.INFO;
  }

  export class Network {
    @IsString()
    host: string = 'api.teambigbox.com';

    @IsInt()
    @Min(0)
    @Max(1 << 16)
    @Type(() => Number)
    port: number = 3000;

    @IsString()
    get url(): string {
      return `http://${this.host}:${this.port}`;
    }

    @IsArray()
    @IsString({ each: true })
    cors: string[] = [];
  }

  export class Auth {
    @IsString()
    type: string = 'service_account';

    @IsString()
    project_id: string;

    @IsString()
    private_key_id: string;

    @IsString()
    private_key: string;

    @IsString()
    client_email: string;

    @IsString()
    client_id: string;

    @IsString()
    auth_uri: string = 'https://accounts.google.com/o/oauth2/auth';

    @IsString()
    token_uri: string = 'https://oauth2.googleapis.com/token';

    @IsString()
    auth_provider_x509_cert_url: string =
      'https://www.googleapis.com/oauth2/v1/certs';

    @IsString()
    client_x509_cert_url: string;

    @IsString()
    universe_domain: string = 'googleapis.com';

    @IsObject()
    get credential(): Record<string, string> {
      return {
        type: this.type,
        project_id: this.project_id,
        private_key_id: this.private_key_id,
        private_key: this.private_key,
        client_email: this.client_email,
        client_id: this.client_id,
        auth_uri: this.auth_uri,
        token_uri: this.token_uri,
        auth_provider_x509_cert_url: this.auth_provider_x509_cert_url,
        client_x509_cert_url: this.client_x509_cert_url,
      };
    }
  }

  export class Db {
    @IsString()
    dbHost: string = 'db';

    @IsInt()
    @Min(0)
    @Max(1 << 16)
    @Type(() => Number)
    dbPort: number = 5432;

    @IsString()
    dbUser: string = 'postgres';

    @IsString()
    @MinLength(4)
    dbPassword: string;

    @IsString()
    dbDatabase: string = 'aroundy';

    @IsString()
    get dbUrl(): string {
      return `postgresql://${this.dbUser}:${this.dbPassword}@${this.dbHost}:${this.dbPort}/${this.dbDatabase}`;
    }
  }

  export class KakaoApi {
    @IsString()
    kakaoApiKey: string;
  }
}
