import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { prismaConfig } from './prisma.config';
import { ConfigModule } from '@/config/config.module';

@Module({
  imports: [ConfigModule, CustomPrismaModule.forRootAsync(prismaConfig)],
  exports: [CustomPrismaModule], // reexport inject-container
})
export class PrismaModule {}
