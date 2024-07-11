import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { Identifiable } from '@/common/identifiable.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Role, Roles, UserId } from '@/roles.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * 전체 포스트 목록을 다양한 쿼리를 통해 조회할 수 있습니다.
   */
  @Get()
  @ApiOperation({ summary: '포스트 목록 조회 및 검색' })
  async fetch(): Promise<Array<PostDto>> {
    return await this.postService.fetch();
  }

  /**
   * 주어진 정보에 따라 새 포스트를 등록합니다.
   */
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: '포스트 등록' })
  async create(@Body() post: PostDto.Create) {
    return await this.postService.create(post);
  }

  /**
   * 해당 포스트를 수정합니다.
   *
   * 현재는 수정 API로 해당 포스트를 올린 기업을 변경할 수 있지만, 추후 이 동작이 불가능해질 수 있습니다.
   */
  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: '포스트 수정' })
  async update(@Param() { id }: Identifiable, @Body() post: PostDto.Update) {
    return this.postService.update(id, post);
  }

  /**
   * 해당 포스트의 조회수를 1 증가시킵니다.
   */
  @Patch(':id/view')
  @ApiOperation({ summary: '포스트 조회수 증가' })
  async view(@Param() { id }: Identifiable) {
    return this.postService.view(id);
  }

  /**
   * 해당 포스트에 좋아요를 누릅니다.
   */
  @Post(':id/like')
  @Roles(Role.User)
  @ApiOperation({ summary: '포스트 좋아요 추가' })
  async like(@UserId() userId: string, @Param() { id }: Identifiable) {
    console.log('u', userId);

    return this.postService.like(id, userId);
  }

  /**
   * 해당 포스트에 좋아요를 취소합니다.
   */
  @Delete(':id/like')
  @Roles(Role.User)
  @ApiOperation({ summary: '포스트 좋아요 삭제' })
  async unlike(@UserId() userId: string, @Param() { id }: Identifiable) {
    return this.postService.unlike(id, userId);
  }

  /**
   * 해당 포스트를 북마크에 추가합니다.
   */
  @Post(':id/save')
  @Roles(Role.User)
  @ApiOperation({ summary: '포스트 북마크 저장' })
  async save(@UserId() userId: string, @Param() { id }: Identifiable) {
    return this.postService.save(id, userId);
  }

  /**
   * 해당 포스트를 북마크에서 삭제합니다.
   */
  @Delete(':id/save')
  @Roles(Role.User)
  @ApiOperation({ summary: '포스트 북마크 삭제' })
  async unsave(@UserId() userId: string, @Param() { id }: Identifiable) {
    return this.postService.unsave(id, userId);
  }

  /**
   * 해당 포스트를 영구적으로 삭제합니다.
   */
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: '포스트 삭제' })
  async remove(@Param() { id }: Identifiable) {
    return this.postService.remove(id);
  }
}
