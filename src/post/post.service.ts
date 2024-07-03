import { Injectable } from '@nestjs/common';
import { CreatePostDto, channelToPrisma, onOffLineFlags } from './post.dto';
import { ExtendedPrismaService } from 'src/prisma.config';
import { KakaoMapService } from './kakao-map.service';
import { sql } from 'kysely';
import { StPoint } from 'prisma/kysely/types.unsupported';
import { Post } from 'prisma/kysely/types';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: ExtendedPrismaService,
    private readonly kakaoMapService: KakaoMapService,
  ) {}

  async create({
    title,
    feeds,
    caption,
    channel,
    location,
    branch,
    contact,
    publishedAt,
    startedAt,
    endedAt,
    link,
    categoryId,
    companyId,
  }: CreatePostDto) {
    let locationColumns: null | Pick<
      Post,
      'location' | 'locationText' | 'region'
    > = null;

    if (location) {
      const resolvedAddress =
        await this.kakaoMapService.coordinateToAddress(location);
      if (!resolvedAddress) {
        throw new Error('Invalid location');
      }

      const { address, region } = resolvedAddress;
      const [lat, lng] = location;

      locationColumns = {
        location: sql<StPoint>`st_makepoint(${lat}, ${lng})`,
        locationText: address,
        region,
      };
    }

    const { isOnline, isOffline } = onOffLineFlags(channel);

    await this.prismaService.client.$kysely
      .insertInto('Post')
      .values({
        // prisma engine immitation
        updatedAt: new Date(),
        title,
        feeds,
        caption,
        channel: channelToPrisma[channel],
        location: locationColumns?.location,
        locationText: locationColumns?.locationText,
        region: locationColumns?.region,
        branch,
        contact,
        publishedAt,
        startedAt,
        endedAt,
        link,
        categoryId,
        companyId,
        isOnline,
        isOffline,
      })
      .execute();
  }
}
