import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { CompanyController } from './company.controller';

@Module({
  imports: [PrismaModule],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
