import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { PrismaModule } from 'nestjs-prisma';
import { prismaConfig } from './prisma.config';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.forRootAsync(prismaConfig),
    PostModule,
    CompanyModule,
    CategoryModule,
    TagModule,
  ],
})
export class AppModule {}
