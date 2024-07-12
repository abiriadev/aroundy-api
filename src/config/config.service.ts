import {
  MinLength,
  IsString,
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
    firebaseClientId: string;

    // TODO: fill information needed to use firebase admin SDK
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
