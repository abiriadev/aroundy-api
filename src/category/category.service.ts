import { Inject, Injectable } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { ExtendedPrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
  ) {}

  async fetch() {
    return await this.prismaService.client.category.findMany({
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
    await this.prismaService.client.category.create({
      data,
    });
  }
}
