import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';

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
