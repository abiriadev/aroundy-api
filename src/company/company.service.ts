import { Inject, Injectable } from '@nestjs/common';
import { CompanyDto } from './company.dto';
import { ExtendedPrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
  ) {}

  async findAll({ contains }: { contains?: string }) {
    return await this.prismaService.client.company.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        logo: true,
      },
      where: {
        deletedAt: null,
        name: {
          contains,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async create(company: CompanyDto.Create) {
    await this.prismaService.client.company.create({
      data: company,
    });
  }

  async update(id: string, company: CompanyDto.Update) {
    await this.prismaService.client.company.update({
      where: { id },
      data: company,
    });
  }

  async remove(id: string) {
    await this.prismaService.client.company.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
