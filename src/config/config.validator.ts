import { configSchema } from './config.schema';
import { parseEnv } from 'znv';

export const configValidator = (config: Record<string, string>) =>
  parseEnv(config, configSchema.shape);
