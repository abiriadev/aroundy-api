import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';

@Module({
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
