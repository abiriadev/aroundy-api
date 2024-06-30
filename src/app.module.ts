import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { configConfig } from './config/config.config';
import { PrismaModule } from 'nestjs-prisma';
import { prismaConfig } from './prisma.config';

@Module({
  imports: [
    ConfigModule.forRoot(configConfig),
    PrismaModule.forRootAsync(prismaConfig),
    UserModule,
    CategoryModule,
    CompanyModule,
    PostModule,
    TagModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
})
export class AppModule {}
