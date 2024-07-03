import { PartialType } from '@nestjs/swagger';
import { CompanyDto } from 'src/company/company.dto';
import { TagDto } from 'src/tag/tag.dto';
import { match } from 'ts-pattern';

export type Coordinate = [number, number];

export enum Channel {
  Online = 'online',
  Offline = 'offline',
  Both = 'both',
  Branch = 'branch',
  OnlineBranch = 'online-branch',
}

// NOTE: temporary solution. We can use prisma generator to generate this enum automatically.
export const channelToPrisma = {
  [Channel.Online]: 'ONLINE',
  [Channel.Offline]: 'OFFLINE',
  [Channel.Both]: 'BOTH',
  [Channel.Branch]: 'BRANCH',
  [Channel.OnlineBranch]: 'ONLINE_BRANCH',
} as const;

export const prismaToChannel = {
  ONLINE: Channel.Online,
  OFFLINE: Channel.Offline,
  BOTH: Channel.Both,
  BRANCH: Channel.Branch,
  ONLINE_BRANCH: Channel.OnlineBranch,
} as const;

export interface OnOffLineFlag {
  isOnline: boolean;
  isOffline: boolean;
}

export const onOffLineFlags = (channel: Channel): OnOffLineFlag =>
  match(channel)
    .with(Channel.Online, () => ({ isOnline: true, isOffline: false }))
    .with(Channel.Offline, () => ({ isOnline: false, isOffline: true }))
    .with(Channel.Both, () => ({ isOnline: true, isOffline: true }))
    .with(Channel.Branch, () => ({ isOnline: false, isOffline: true }))
    .with(Channel.OnlineBranch, () => ({ isOnline: true, isOffline: true }))
    .exhaustive();

export class BasePostDto {
  title: string;
  feeds: Array<string>;
  caption: string;
  channel: Channel;
  location: Coordinate;
  branch: string | null;
  contact: string | null;
  publishedAt: Date;
  startedAt: Date | null;
  endedAt: Date | null;
  link: string | null;
}

export class CreatePostDto extends BasePostDto {
  categoryId: string;
  companyId: string;
  tagIds: Array<string>;
}

export class PostDto extends BasePostDto implements OnOffLineFlag {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  categories: Array<string>;
  company: CompanyDto;
  locationText: string;
  region: string;
  likes: number;
  views: number;
  tags: TagDto;
  isOnline: boolean;
  isOffline: boolean;
}

export class PaginatedPostsDto {
  items: Array<PostDto>;
  cursor: string | null;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
