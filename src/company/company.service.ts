import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCompanyDto,
  PaginatedCompaniesDto,
  UpdateCompanyDto,
} from './company.dto';
import { ExtendedPrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
  ) {}

  async findAll({
    name,
    cursor,
    take,
  }: {
    name?: string;
    cursor?: string;
    take?: number;
  }): Promise<PaginatedCompaniesDto> {
    const items = await this.prismaService.client.company.findMany({
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
          contains: name,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: take ?? 10,
      skip: cursor === undefined ? 0 : 1,
      cursor: {
        id: cursor,
      },
    });

    return {
      items,
      cursor: items.at(-1)?.id ?? null,
    };
  }

  async create(company: CreateCompanyDto) {
    await this.prismaService.client.company.create({
      data: company,
    });
  }

  async update(id: string, company: UpdateCompanyDto) {
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
