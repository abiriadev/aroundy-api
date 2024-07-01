import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}

  async create(category: CreateTagDto) {
    await this.prismaService.category.create({
      data: category,
    });
  }
}
