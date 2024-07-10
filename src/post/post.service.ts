import { Inject, Injectable } from '@nestjs/common';
import { KakaoMapService } from './kakao-map.service';
import { ExtendedPrismaService } from '@/prisma/prisma.service';
import { Coordinate, PostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
    private readonly kakaoMapService: KakaoMapService,
  ) {}

  async fetch(): Promise<Array<PostDto>> {
    return (
      await this.prismaService.client.post.findMany({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          title: true,
          feeds: true,
          caption: true,
          contact: true,
          publishedAt: true,
          startedAt: true,
          endedAt: true,
          link: true,
          views: true,
          isOnline: true,
          isOffline: true,
          lat: true,
          lng: true,
          address1: true,
          address2: true,
          region: true,
          branch: true,
          tags: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          company: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              name: true,
              logo: true,
            },
          },
          _count: {
            select: {
              likedUsers: true,
            },
          },
        },
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    ).map(({ lat, lng, _count: { likedUsers: likes }, ...rest }) => ({
      location: lat !== null && lng !== null ? [lat, lng] : null,
      likes,
      liked: false,
      saved: false,
      ...rest,
    }));
  }

  async create({ location, tagIds, ...rest }: PostDto.Create) {
    await this.prismaService.client.post.create({
      data: {
        lat: location?.[0],
        lng: location?.[1],
        tags: {
          connect: [...tagIds.map((id) => ({ id }))],
        },
        ...rest,
      },
    });
  }

  async update(id: string, { location, tagIds, ...rest }: PostDto.Update) {
    await this.prismaService.client.post.update({
      where: { id },
      data: {
        lat: location?.[0],
        lng: location?.[1],
        tags: tagIds && {
          connect: [...tagIds.map((id) => ({ id }))],
        },
        ...rest,
      },
    });
  }

  async remove(id: string) {
    await this.prismaService.client.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
