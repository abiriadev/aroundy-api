import {
  MinLength,
  IsString,
  IsObject,
  IsArray,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

export enum LogFormat {
  JSON = 'json',
  PRETTY = 'pretty',
}

export namespace ConfigService {
  export class App {
    @IsEnum(LogLevel)
    logLevel: LogLevel = LogLevel.INFO;

    @IsEnum(LogFormat)
    logFormat: LogFormat = LogFormat.JSON;

    @IsString()
    @IsOptional()
    imageTag?: string;
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
      return `https://${this.host}`;
    }

    @IsArray()
    @IsString({ each: true })
    cors: string[] = [];
  }

  export class Auth {
    @IsString()
    type: string = 'service_account';

    @IsString()
    projectId: string;

    @IsString()
    privateKeyId: string;

    @IsString()
    privateKey: string;

    @IsString()
    clientEmail: string;

    @IsString()
    clientId: string;

    @IsString()
    authUri: string = 'https://accounts.google.com/o/oauth2/auth';

    @IsString()
    tokenUri: string = 'https://oauth2.googleapis.com/token';

    @IsString()
    authProviderX509CertUrl: string =
      'https://www.googleapis.com/oauth2/v1/certs';

    @IsString()
    clientX509CertUrl: string;

    @IsString()
    universeDomain: string = 'googleapis.com';

    @IsObject()
    get credential(): Record<string, string> {
      return {
        type: this.type,
        project_id: this.projectId,
        private_key_id: this.privateKeyId,
        private_key: this.privateKey,
        client_email: this.clientEmail,
        client_id: this.clientId,
        auth_uri: this.authUri,
        token_uri: this.tokenUri,
        auth_provider_x509_cert_url: this.authProviderX509CertUrl,
        client_x509_cert_url: this.clientX509CertUrl,
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
