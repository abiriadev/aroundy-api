import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ArticleModule } from './article/article.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './middleware/guard/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ArticleModule, CommonModule, DatabaseModule, ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
