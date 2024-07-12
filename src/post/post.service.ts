import { Inject, Injectable } from '@nestjs/common';
import { KakaoMapService } from './kakao-map.service';
import { ExtendedPrismaService } from '@/prisma/prisma.service';
import { PostDto } from './post.dto';
import { match, P } from 'ts-pattern';
import { Prisma } from '@prisma/client';
import { Coordinate } from './coordinate.dto';

@Injectable()
export class PostService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: ExtendedPrismaService,
    private readonly kakaoMapService: KakaoMapService,
  ) {}

  async fetch({
    q,
    range,
    category,
    company,
    channel,
    state,
    region,
    sort,
  }: PostDto.Query): Promise<PostDto.Paginated> {
    const query = {
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
        categoryId: category,
        companyId: company,
        address1: region,
        isOnline: channel === PostDto.Channel.Online,
        isOffline: channel === PostDto.Channel.Offline,
        ...match(state)
          .with(PostDto.State.Ongoing, () => ({
            startedAt: {
              lte: new Date(),
            },
            endedAt: {
              gte: new Date(),
            },
          }))
          .with(PostDto.State.Ended, () => ({
            endedAt: {
              lte: new Date(),
            },
          }))
          .otherwise(() => ({})),
        ...match([q, range])
          .with([P.nonNullable, PostDto.SearchRange.Company], ([q]) => ({
            company: { name: { contains: q } },
          }))
          .with([P.nonNullable, PostDto.SearchRange.Title], ([q]) => ({
            title: { contains: q },
          }))
          .with([P.nonNullable, PostDto.SearchRange.Caption], ([q]) => ({
            caption: { contains: q },
          }))
          .with([P.nonNullable, undefined], ([q]) => ({
            OR: [
              { company: { name: { contains: q } } },
              { title: { contains: q } },
              { caption: { contains: q } },
            ],
          }))
          .otherwise(() => ({})),
      },
      orderBy: match(sort)
        .with(P.optional(PostDto.Sort.Latest), () => ({
          publishedAt: 'desc' as const,
        }))
        .with(PostDto.Sort.Popular, () => {
          throw new Error('Not implemented');
        })
        .with(PostDto.Sort.StartingSoon, () => ({
          startedAt: 'asc' as const,
        }))
        .with(PostDto.Sort.EndingSoon, () => ({
          endedAt: 'asc' as const,
        }))
        .exhaustive(),
    } satisfies Prisma.PostFindManyArgs;

    const [count, findMany] = await this.prismaService.client.$transaction([
      this.prismaService.client.post.count({
        where: query.where,
      }),
      this.prismaService.client.post.findMany(query),
    ]);

    const postprocessedFindMany = findMany.map(
      ({ lat, lng, _count: { likedUsers: likes }, ...rest }) => ({
        location:
          lat !== null && lng !== null ? ([lat, lng] as Coordinate) : null,
        likes,
        liked: false,
        saved: false,
        ...rest,
      }),
    );

    return {
      total: count,
      next: null,
      prev: null,
      items: postprocessedFindMany,
    };
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

  async view(id: string) {
    await this.prismaService.client.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  async like(id: string, userId: string) {
    await this.prismaService.client.post.update({
      where: { id },
      data: { likedUsers: { connect: [{ uid: userId }] } },
    });
  }

  async unlike(id: string, userId: string) {
    await this.prismaService.client.post.update({
      where: { id },
      data: { likedUsers: { disconnect: [{ uid: userId }] } },
    });
  }

  async save(id: string, userId: string) {
    await this.prismaService.client.post.update({
      where: { id },
      data: { savedUsers: { connect: [{ uid: userId }] } },
    });
  }

  async unsave(id: string, userId: string) {
    await this.prismaService.client.post.update({
      where: { id },
      data: { savedUsers: { disconnect: [{ uid: userId }] } },
    });
  }

  async remove(id: string) {
    await this.prismaService.client.post.delete({
      where: { id },
    });
  }
}
