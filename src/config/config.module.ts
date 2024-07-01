import { DynamicModule, Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { env } from 'node:process';
import {
  AppConfig,
  NetworkConfig,
  AuthConfig,
  DbConfig,
  KakaoApiConfig,
} from './config.service';

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        AppConfig,
        NetworkConfig,
        AuthConfig,
        DbConfig,
        KakaoApiConfig,
      ].map((schema) =>
        TypedConfigModule.forRoot({
          schema,
          load: dotenvLoader({
            keyTransformer: (key) => key.toLowerCase(),
            ignoreEnvFile: env.NODE_ENV === 'production',
            expandVariables: true,
          }),
        }),
      ),
    };
  }
}
