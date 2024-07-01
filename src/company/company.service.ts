import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CompanyDto,
  CreateCompanyDto,
  PaginatedCompaniesDto,
  UpdateCompanyDto,
} from './company.dto';

@Injectable()
export class CompanyService {
  constructor(private prismaService: PrismaService) {}

  async findAll({
    name,
    cursor,
    take,
  }: {
    name?: string;
    cursor?: string;
    take?: number;
  }): Promise<PaginatedCompaniesDto> {
    const items = await this.prismaService.company.findMany({
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
    await this.prismaService.company.create({
      data: company,
    });
  }

  async update(id: string, company: UpdateCompanyDto) {
    await this.prismaService.company.update({
      where: { id },
      data: company,
    });
  }

  async remove(id: string) {
    await this.prismaService.company.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
