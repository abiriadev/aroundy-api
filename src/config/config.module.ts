import { DynamicModule, Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { env } from 'node:process';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: Object.values(ConfigService).map((schema) =>
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
