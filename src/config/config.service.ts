import { MinLength, IsInt, IsString, IsArray, IsEnum } from 'class-validator';
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
    @Type(() => Number)
    port: number = 3000;

    @IsArray()
    @IsString({ each: true })
    cors: string[] = [];
  }

  export class Auth {
    @IsString()
    @MinLength(4)
    jwt_secret: string;

    @IsString()
    jwt_expiry: string = '4w';

    @IsString()
    @MinLength(4)
    pepper: string;
  }

  export class Db {
    @IsString()
    db_host: string = 'db';

    @IsInt()
    @Type(() => Number)
    db_port: number = 5432;

    @IsString()
    db_user: string = 'postgres';

    @IsString()
    @MinLength(4)
    db_password: string;

    @IsString()
    db_database: string = 'aroundy';
  }

  export class KakaoApi {
    @IsString()
    kakao_api_key: string;
  }
}
