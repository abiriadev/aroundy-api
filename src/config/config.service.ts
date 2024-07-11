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
    firebaseClientId: string;

    // TODO: fill information needed to use firebase admin SDK
  }

  export class Db {
    @IsString()
    dbHost: string = 'db';

    @IsInt()
    @Type(() => Number)
    dbPort: number = 5432;

    @IsString()
    dbUser: string = 'postgres';

    @IsString()
    @MinLength(4)
    dbPassword: string;

    @IsString()
    dbDatabase: string = 'aroundy';
  }

  export class KakaoApi {
    @IsString()
    kakaoApiKey: string;
  }
}
