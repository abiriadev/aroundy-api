import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ArticleModule } from './article/article.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './middleware/guard/auth.guard';

@Module({
  imports: [ArticleModule, CommonModule, DatabaseModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
