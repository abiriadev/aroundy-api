import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}

  async fetch() {
    return await this.prismaService.tag.findMany({
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
    await this.prismaService.tag.create({
      data,
    });
  }
}
