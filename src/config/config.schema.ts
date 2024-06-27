import { z } from 'zod';

const portSchema = z
  .number()
  .int()
  .nonnegative()
  .lt(1 << 16);

const secretSchema = z.string().min(4);

const networkConfigSchema = z.object({
  HOST: z.string().default('api.teambigbox.com'),
  PORT: portSchema.default(3000),

  // regex for allowed origins
  CORS: z.string().array().default([]),
});

const authCredentialsConfigSchema = z.object({
  JWT_SECRET: secretSchema,
  JWT_EXPIRY: z.string().default('4w'),
  PEPPER: secretSchema,
});

const dbCredentialsConfigSchema = z.object({
  DB_HOST: z.string().default('db'),
  DB_PORT: portSchema.default(5432),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: secretSchema,
  DB_DATABASE: z.string().default('aroundy'),
});

const logConfigSchema = z.object({
  LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export const configSchema = z
  .object({})
  .merge(networkConfigSchema)
  .merge(authCredentialsConfigSchema)
  .merge(dbCredentialsConfigSchema)
  .merge(logConfigSchema);

export type ConfigType = z.infer<typeof configSchema>;
