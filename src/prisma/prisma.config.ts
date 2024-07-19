import { CustomPrismaModuleAsyncOptions } from 'nestjs-prisma';
import { ConfigService, LogLevel } from '@/config/config.service';
import { ConfigModule } from '@/config/config.module';
import kyselyExtension from 'prisma-extension-kysely';
import { PrismaClient } from '@prisma/client';
import type { DB } from '@/kysely/types';
import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from 'kysely';
import { match, P } from 'ts-pattern';

const extendedPrismaClientFactory = (
  { dbUrl }: ConfigService.Db,
  { logLevel }: ConfigService.App,
) =>
  new PrismaClient({
    datasourceUrl: dbUrl,
    log: [
      {
        emit: 'event',
        level: match(logLevel)
          .with(LogLevel.TRACE, () => 'query' as const)
          .with(P.union(LogLevel.DEBUG, LogLevel.INFO), () => 'info' as const)
          .with(LogLevel.WARN, () => 'warn' as const)
          .with(P.union(LogLevel.ERROR, LogLevel.FATAL), () => 'error' as const)
          .exhaustive(),
      },
    ],
  }).$extends(
    kyselyExtension({
      kysely: (driver) =>
        new Kysely<DB>({
          dialect: {
            createDriver: () => driver,
            createAdapter: () => new PostgresAdapter(),
            createIntrospector: (db) => new PostgresIntrospector(db),
            createQueryCompiler: () => new PostgresQueryCompiler(),
          },
          plugins: [],
        }),
    }),
  );

export type ExtendedPrismaClient = ReturnType<
  typeof extendedPrismaClientFactory
>;

export const prismaConfig = {
  name: 'PrismaService',
  imports: [ConfigModule],
  inject: [ConfigService.Db, ConfigService.App],
  useFactory: extendedPrismaClientFactory,
} satisfies CustomPrismaModuleAsyncOptions<ExtendedPrismaClient>;
