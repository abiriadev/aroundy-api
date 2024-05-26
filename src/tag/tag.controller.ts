import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag as TagEntity } from './tag.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): Promise<TagEntity[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TagEntity> {
    return this.tagService.findOne(id);
  }

  @Post()
  create(@Body() post: TagEntity): Promise<TagEntity> {
    return this.tagService.create(post);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() tag: TagEntity): Promise<TagEntity> {
    return this.tagService.update(id, tag);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TagEntity> {
    return this.tagService.remove(id);
  }
}
