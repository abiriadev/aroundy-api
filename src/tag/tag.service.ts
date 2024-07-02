import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}

  async create(tag: CreateTagDto) {
    await this.prismaService.tag.create({
      data: tag,
    });
  }
}
