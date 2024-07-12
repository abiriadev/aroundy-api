import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CompanyDto } from './company.dto';
import { ExtendedPrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
  ) {}

  async fetch(query: CompanyDto.Query): Promise<CompanyDto.Paginated> {
    const { q, cursor } = query;

    const prismaQuery = {
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
          contains: q,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      cursor: {
        id: cursor,
      },
      take: query.toRawTake(),
    } satisfies Prisma.CompanyFindManyArgs;

    const [count, findMany] = await this.prismaService.client.$transaction([
      this.prismaService.client.company.count({
        where: prismaQuery.where,
      }),
      this.prismaService.client.company.findMany(prismaQuery),
    ]);

    return {
      total: count,
      next: findMany.at(-1)?.id ?? null,
      prev: findMany.at(0)?.id ?? null,
      items: findMany,
    };
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
    const { deletedAt } =
      await this.prismaService.client.company.findUniqueOrThrow({
        select: { deletedAt: true },
        where: { id },
      });

    if (deletedAt !== null)
      throw new HttpException(
        'The request company is already deleted.',
        HttpStatus.NOT_FOUND,
      );

    await this.prismaService.client.company.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
