import { CompanyDto } from 'src/company/company.dto';
import { TagDto } from 'src/tag/tag.dto';

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
