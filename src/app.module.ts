import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './middleware/guard/auth.guard';
import { PostModule } from './post/post.module';
import { AccountModule } from './account/account.module';
import { envFilePath } from './load-env';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    PostModule,
    AccountModule,
    CategoriesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
