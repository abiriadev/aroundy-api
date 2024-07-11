import { ExtendedPrismaService } from '@/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
  ) {}

  async fetch() {
    return await this.prismaService.client.user.findMany();
  }

  async remove(id: string) {
    await this.prismaService.client.user.delete({
      where: { uid: id },
    });
  }
}
