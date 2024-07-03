import { Injectable } from '@nestjs/common';
import { CreatePostDto, channelToPrisma, onOffLineFlags } from './post.dto';
import { ExtendedPrismaService } from 'src/prisma.config';
import { KakaoMapService } from './kakao-map.service';
import { sql } from 'kysely';
import { StPoint } from 'prisma/kysely/types.unsupported';

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
    const resolvedAddress =
      await this.kakaoMapService.coordinateToAddress(location);
    if (!resolvedAddress) {
      throw new Error('Invalid location');
    }

    const { address, region } = resolvedAddress;
    const [lat, lng] = location;
    const { isOnline, isOffline } = onOffLineFlags(channel);

    await this.prismaService.client.$kysely
      .insertInto('Post')
      .values({
        updatedAt: new Date(),
        title,
        feeds,
        caption,
        channel: channelToPrisma[channel],
        location: sql<StPoint>`st_makepoint(${lat}, ${lng})`,
        locationText: address,
        region: region,
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
