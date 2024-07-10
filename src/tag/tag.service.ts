import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}

  async create(data: TagDto.Create) {
    await this.prismaService.tag.create({
      data,
    });
  }
}
