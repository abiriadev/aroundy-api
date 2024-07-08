import {
  CustomPrismaModuleAsyncOptions,
  CustomPrismaService,
} from 'nestjs-prisma';
import { DbConfig } from '@/config/config.service';
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

const extendedPrismaClientFactory = ({
  db_host,
  db_user,
  db_port,
  db_password,
  db_database,
}: DbConfig) =>
  new PrismaClient({
    datasourceUrl: `postgresql://${db_user}:${db_password}@${db_host}:${db_port}/${db_database}`,
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
