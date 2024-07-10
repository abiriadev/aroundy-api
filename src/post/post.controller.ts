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

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: '포스트 목록 조회 및 검색' })
  async fetch(): Promise<Array<PostDto>> {
    return await this.postService.fetch();
  }

  @Post()
  @ApiOperation({ summary: '포스트 등록' })
  async create(@Body() post: PostDto.Create) {
    return await this.postService.create(post);
  }

  @Patch(':id')
  @ApiOperation({ summary: '포스트 수정' })
  async update(@Param() { id }: Identifiable, @Body() post: PostDto.Update) {
    return this.postService.update(id, post);
  }

  @Delete(':id')
  @ApiOperation({ summary: '포스트 삭제' })
  async remove(@Param() { id }: Identifiable) {
    return this.postService.remove(id);
  }
}
