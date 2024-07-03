import {
  CustomPrismaModuleAsyncOptions,
  CustomPrismaService,
} from 'nestjs-prisma';
import { DbConfig } from './config/config.service';
import { ConfigModule } from './config/config.module';
import kyselyExtension from 'prisma-extension-kysely';
import { PrismaClient } from '@prisma/client';
import type { DB } from '../prisma/kysely/types';
import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from 'kysely';

const extendedPrismaClientFactory = (dbConfigService: DbConfig) =>
  new PrismaClient({
    datasourceUrl: `postgresql://${dbConfigService.db_user}:${dbConfigService.db_password}@${dbConfigService.db_host}:${dbConfigService.db_port}/${dbConfigService.db_database}`,
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

export type ExtendedPrismaService = CustomPrismaService<ExtendedPrismaClient>;

export const prismaConfig = {
  name: 'PrismaService',
  imports: [ConfigModule],
  inject: [DbConfig],
  useFactory: extendedPrismaClientFactory,
} satisfies CustomPrismaModuleAsyncOptions<ExtendedPrismaClient>;
