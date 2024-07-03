import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CustomPrismaModule } from 'nestjs-prisma';

@Module({
  imports: [CustomPrismaModule],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
