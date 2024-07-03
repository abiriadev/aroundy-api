import { PartialType } from '@nestjs/swagger';
import { CompanyDto } from 'src/company/company.dto';
import { TagDto } from 'src/tag/tag.dto';

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
};

export const prismaToChannel = {
  ONLINE: Channel.Online,
  OFFLINE: Channel.Offline,
  BOTH: Channel.Both,
  BRANCH: Channel.Branch,
  ONLINE_BRANCH: Channel.OnlineBranch,
};

export class BasePostDto {
  title: string;
  feeds: Array<string>;
  caption: string;
  channel: string;
  location: [number, number];
  branch: string | null;
  contact: string | null;
  publishedAt: Date;
  startedAt: Date | null;
  endedAt: Date | null;
  link: string | null;
}

export class CreatePostDto extends BasePostDto {
  categoryIds: Array<string>;
  companyIds: Array<string>;
  tagIds: Array<string>;
}

export class PostDto extends BasePostDto {
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
}

export class PaginatedPostsDto {
  items: Array<PostDto>;
  cursor: string | null;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
