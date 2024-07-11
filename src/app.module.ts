import { Module } from '@nestjs/common';
import { CategoryModule } from '@/category/category.module';
import { CompanyModule } from '@/company/company.module';
import { PostModule } from '@/post/post.module';
import { TagModule } from '@/tag/tag.module';
import { ConfigModule } from '@/config/config.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    PostModule,
    CompanyModule,
    CategoryModule,
    TagModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
