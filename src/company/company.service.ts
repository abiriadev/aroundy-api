import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

export interface Company {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  logo: string;
}

export interface CreateCompany {
  name: string;
  logo: string;
}

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
  }): Promise<{
    items: Array<Company>;
    cursor: string | null;
  }> {
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

  async create(company: CreateCompany) {
    await this.prismaService.company.create({
      data: company,
    });
  }

  async update(id: string, company: Partial<CreateCompany>) {
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
