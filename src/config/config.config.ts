import { env } from 'node:process';
import { configSchema } from './config.schema';
import { parseEnv } from 'znv';

export const configConfig = {
  ignoreEnvFile: env.NODE_ENV === 'production',
  envFilePath: env.NODE_ENV === 'production' ? undefined : '.local.env',
  expandVariables: true,
  validate: (config: Record<string, string>) =>
    parseEnv(config, configSchema.shape),
};
