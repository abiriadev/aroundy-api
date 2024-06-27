import { ConfigModule, ConfigService } from '@nestjs/config';
import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigType } from './config/config.schema';
import { User } from './user/user.entity';
import { Category } from './category/category.entity';
import { Company } from './company/company.entity';
import { Post } from './post/post.entity';
import { Tag } from './tag/tag.entity';

export const typeOrmConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService<ConfigType>) => ({
    type: 'postgres',
    host: configService.get('DB_HOST', { infer: true }),
    port: configService.get('DB_PORT', { infer: true }),
    username: configService.get('DB_USER', { infer: true }),
    password: configService.get('DB_PASSWORD', { infer: true }),
    database: configService.get('DB_DATABASE', { infer: true }),
    entities: [User, Category, Company, Post, Tag],
    synchronize: true,
  }),
} satisfies TypeOrmModuleAsyncOptions;
