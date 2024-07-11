import { Module } from '@nestjs/common';
import { CategoryModule } from '@/category/category.module';
import { CompanyModule } from '@/company/company.module';
import { PostModule } from '@/post/post.module';
import { TagModule } from '@/tag/tag.module';
import { ConfigModule } from '@/config/config.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    PostModule,
    CompanyModule,
    CategoryModule,
    TagModule,
    UserModule,
    PrometheusModule.register(),
  ],
  controllers: [AppController],
})
export class AppModule {}
