import { Controller, Post, Body, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './tag.dto';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/auth/roles.decorator';
import { Role } from '@/auth/roles.enum';

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
  @ApiTags('App', 'Admin')
  @Get()
  @ApiOperation({ summary: '태그 목록 조회', operationId: 'fetchTags' })
  async fetch(): Promise<Array<TagDto>> {
    return this.TagService.fetch();
  }

  /**
   * 새 태그를 등록합니다.
   *
   * 같은 이름의 태그가 이미 존재하는 경우, 예외가 발생합니다.
   */
  @ApiTags('Admin')
  @Post()
  @ApiCookieAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: '태그 등록', operationId: 'createTag' })
  async create(@Body() Tag: TagDto.Create) {
    return this.TagService.create(Tag);
  }
}
