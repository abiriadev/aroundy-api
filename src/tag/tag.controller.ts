import { Controller, Post, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly TagService: TagService) {}

  @Post()
  create(@Body() Tag: CreateTagDto) {
    return this.TagService.create(Tag);
  }
}
