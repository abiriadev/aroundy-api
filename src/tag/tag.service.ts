import { Inject, Injectable } from '@nestjs/common';
import { TagDto } from './tag.dto';
import { ExtendedPrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
  ) {}

  async fetch() {
    return await this.prismaService.client.tag.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async create(data: TagDto.Create) {
    await this.prismaService.client.tag.create({
      data,
    });
  }
}
