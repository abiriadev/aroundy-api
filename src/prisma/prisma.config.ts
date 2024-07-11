import {
  CustomPrismaModuleAsyncOptions,
  CustomPrismaService,
} from 'nestjs-prisma';
import { ConfigService } from '@/config/config.service';
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

const extendedPrismaClientFactory = ({ dbUrl }: ConfigService.Db) =>
  new PrismaClient({
    datasourceUrl: dbUrl(),
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
  inject: [ConfigService.Db],
  useFactory: extendedPrismaClientFactory,
} satisfies CustomPrismaModuleAsyncOptions<ExtendedPrismaClient>;
