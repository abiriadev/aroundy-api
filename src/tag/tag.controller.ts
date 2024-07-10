import { Controller, Post, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly TagService: TagService) {}

  @Post()
  create(@Body() Tag: TagDto.Create) {
    return this.TagService.create(Tag);
  }
}
