import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Category } from 'src/database/models/category.model';
import { Company } from 'src/database/models/company.model';
import { Post } from 'src/database/models/post.model';
import { Tag } from 'src/database/models/tag.model';

import { CreatePostDto } from './dtos/post.request.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
    @InjectModel(Company)
    private readonly companyModel: typeof Company,
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {}

  async writePost(createPostDto: CreatePostDto): Promise<any> {
    const { geo, publish_date, start_date, end_date, feed_urls, tag_ids } =
      createPostDto;

    // Geo 데이터 처리
    let geoData: { type: string; coordinates: number[] };
    if (geo === ', ') {
      createPostDto.is_online = true;
      createPostDto.is_offline = false;
    } else if (createPostDto.is_online) {
      geoData = {
        type: 'Point',
        coordinates: [Number(geo.split(',')[0]), Number(geo.split(',')[1])],
      };
    }

    // 날짜 데이터 처리
    createPostDto.publish_date = publish_date
      ? new Date(publish_date)
      : undefined;
    createPostDto.start_date = start_date ? new Date(start_date) : undefined;
    createPostDto.end_date = end_date ? new Date(end_date) : undefined;

    // 이미지 파일 처리
    createPostDto.feed_urls = feed_urls;

    const createPostEntity = {
      ...createPostDto,
      geo: geoData,
    };

    // 게시물 생성
    const post = await this.postModel.create(createPostEntity);

    // 태그 추가
    for (const tagId of tag_ids) {
      const tag = await this.tagModel.findByPk(tagId);
      if (tag) {
        await post.$add('Tag', tag.id);
      }
    }

    return post;
  }
}
