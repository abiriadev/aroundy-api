import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './middleware/guard/auth.guard';

@Module({
  imports: [CommonModule, DatabaseModule, ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
