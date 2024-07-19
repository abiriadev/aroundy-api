import { Module } from '@nestjs/common';
import {
  CustomPrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { ExtendedPrismaClient, prismaConfig } from './prisma.config';
import { ConfigModule } from '@/config/config.module';
import { LoggerModule } from '@/logger/logger.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    CustomPrismaModule.forRootAsync<ExtendedPrismaClient>(prismaConfig),
  ],
  providers: [providePrismaClientExceptionFilter()],
  exports: [CustomPrismaModule], // reexport inject-container
})
export class PrismaModule {}
