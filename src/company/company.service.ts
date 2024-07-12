import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CompanyDto } from './company.dto';
import { ExtendedPrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
  ) {}

  async fetch(query: CompanyDto.Query) {
    const { q, cursor } = query;

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
