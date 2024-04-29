import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

import { Company } from './models/company.model';
import { Post } from './models/post.model';
import { Tag } from './models/tag.model';
import { Category } from './models/category.model';
import { User } from './models/user.model';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get<Dialect>('DB_DIALECT'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DATABASE'),
        models: [Company, Post, Tag, Category, User],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    SequelizeModule.forFeature([Company, Post, Tag, Category, User]),
  ],
  exports: [SequelizeModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
