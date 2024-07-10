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
import { PostDto } from './post.dto';
import { Identifiable } from '@/common/identifiable.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async fetch(): Promise<Array<PostDto>> {
    return await this.postService.fetch();
  }

  @Post()
  async create(@Body() post: PostDto.Create) {
    return await this.postService.create(post);
  }

  @Put(':id')
  async update(@Param() { id }: Identifiable, @Body() post: PostDto.Update) {
    return this.postService.update(id, post);
  }

  @Delete(':id')
  async remove(@Param() { id }: Identifiable) {
    return this.postService.remove(id);
  }
}
