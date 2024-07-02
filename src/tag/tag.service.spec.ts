import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { PrismaModule } from 'nestjs-prisma';

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TagService],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it.skip('should insert a new tag', async () => {
    await service.create({
      name: 'test',
    });
  });
});
