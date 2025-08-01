import { Module } from '@nestjs/common';
import { CategoryModule } from '@/category/category.module';
import { CompanyModule } from '@/company/company.module';
import { PostModule } from '@/post/post.module';
import { TagModule } from '@/tag/tag.module';
import { ConfigModule } from '@/config/config.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';
import { AppController } from './app.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricController } from './metric.controller';
import { LoggerModule } from '@/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    PrismaModule,
    AuthModule,
    PostModule,
    CompanyModule,
    CategoryModule,
    TagModule,
    UserModule,
    PrometheusModule.register({
      controller: MetricController,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
