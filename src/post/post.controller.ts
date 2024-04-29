import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { GetUser } from 'src/middleware/decorator/public.decorator';

import { CreatePostDto, PostResponseDTO } from './dtos/post.request.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @ApiOperation({ summary: '포스트 조회 (카테고리 기반)' })
  @ApiResponse({
    status: 200,
    description: '포스트 조회 성공',
    type: [PostResponseDTO],
  })
  @ApiResponse({ status: 500, description: '존재하지 않는 카테고리입니다.' })
  @ApiParam({ name: 'category', description: '수업의 고유 식별자' })
  @ApiBearerAuth()
  @Get('/:category')
  approveMatchingClassroom(
    @GetUser() userAuth: any,
    @Param('category') roomId: string,
  ): void {}

  @ApiOperation({ summary: '포스트 생성' })
  @ApiResponse({
    status: 200,
    description: '포스트 조회 성공',
    type: [PostResponseDTO],
  })
  @ApiResponse({ status: 500, description: '존재하지 않는 카테고리입니다.' })
  @ApiParam({
    name: 'category',
    description: '수업의 고유 식별자',
    type: CreatePostDto,
  })
  @ApiBearerAuth()
  @Post()
  포스트_생성(@GetUser() userAuth: any, @Body() body: CreatePostDto) {
    this.postService.writePost(body);
  }
}
