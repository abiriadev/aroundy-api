import { Controller, Post, Body, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './tag.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('tags')
export class TagController {
  constructor(private readonly TagService: TagService) {}

  /**
   * 모든 태그 목록 조회.
   *
   * 태그 자동완성 UI를 구현할 때 사용합니다.
   *
   * 기본적으로 각 태그가 추가된 순서대로 정렬되어 반환됩니다.
   */
  @Get()
  @ApiOperation({ summary: '태그 목록 조회' })
  async fetch() {
    return this.TagService.fetch();
  }

  /**
   * 새 태그를 등록합니다.
   *
   * 같은 이름의 태그가 이미 존재하는 경우, 예외가 발생합니다.
   */
  @Post()
  @ApiOperation({ summary: '태그 등록' })
  async create(@Body() Tag: TagDto.Create) {
    return this.TagService.create(Tag);
  }
}
