import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { ConfigModule } from '@/config/config.module';
import { PrismaModule } from '@/prisma/prisma.module';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // ConfigModule.forRoot(),
        PrismaModule,
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
