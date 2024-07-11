import { ExtendedPrismaService } from '@/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
  ) {}

  async fetch() {
    return await this.prismaService.client.user.findMany({
      select: {
        createdAt: true,
        updatedAt: true,
        uid: true,
        oauthProvider: true,
        recentlyLoggedInAt: true,
      },
    });
  }

  async profile(id: string): Promise<UserDto.Profile> {
    const { savedPosts, ...rest } =
      await this.prismaService.client.user.findUniqueOrThrow({
        where: { uid: id },
        select: {
          createdAt: true,
          updatedAt: true,
          uid: true,
          oauthProvider: true,
          recentlyLoggedInAt: true,
          savedPosts: {
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
          },
        },
      });

    return {
      saved: savedPosts.map(
        ({ lat, lng, _count: { likedUsers: likes }, ...rest }) => ({
          location: lat !== null && lng !== null ? [lat, lng] : null,
          likes,
          liked: false,
          saved: false,
          ...rest,
        }),
      ),
      ...rest,
    };
  }

  async remove(id: string) {
    await this.prismaService.client.user.delete({
      where: { uid: id },
    });
  }
}
