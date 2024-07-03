import { Test, TestingModule } from '@nestjs/testing';
import { CustomPrismaModule } from 'nestjs-prisma';
import { CompanyService } from './company.service';
import { prismaConfig } from '@/prisma.config';
import { ConfigModule } from '@/config/config.module';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        CustomPrismaModule.forRootAsync(prismaConfig),
      ],
      providers: [CompanyService],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it.skip('should insert a new company', async () => {
    await service.create({
      name: 'Aroundy',
      logo: 'https://aroundy.com/logo.png',
    });
  });
});
