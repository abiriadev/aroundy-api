import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async create(data: CategoryDto.Create) {
    await this.prismaService.category.create({
      data,
    });
  }
}
