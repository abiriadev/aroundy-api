import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() post: PostEntity,
  ): Promise<PostEntity> {
    return this.postService.update(id, post);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.remove(id);
  }
}
