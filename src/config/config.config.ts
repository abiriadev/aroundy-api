import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { env } from 'node:process';
import {
  AppConfig,
  NetworkConfig,
  AuthCredentialConfig,
  DbCredentialConfig,
} from './config.schema';

export const configConfig = [
  AppConfig,
  NetworkConfig,
  AuthCredentialConfig,
  DbCredentialConfig,
].map((schema) =>
  TypedConfigModule.forRoot({
    schema,
    load: dotenvLoader({
      keyTransformer: (key) => key.toLowerCase(),
      ignoreEnvFile: env.NODE_ENV === 'production',
      envFilePath: '.local.env',
      expandVariables: true,
    }),
  }),
);
