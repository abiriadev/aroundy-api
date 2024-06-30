import { PrismaModuleAsyncOptions } from 'nestjs-prisma';
import { DbConfig } from './config/config.service';
import { ConfigModule } from './config/config.module';

export const prismaConfig = {
  imports: [ConfigModule],
  inject: [DbConfig],
  useFactory: (dbConfigService: DbConfig) => ({
    prismaOptions: {
      datasourceUrl: `postgresql://${dbConfigService.db_user}:${dbConfigService.db_password}@${dbConfigService.db_host}:${dbConfigService.db_port}/${dbConfigService.db_database}`,
    },
  }),
} satisfies PrismaModuleAsyncOptions;
