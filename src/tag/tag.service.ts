import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  findOne(id: string): Promise<Tag> {
    return this.tagRepository.findOne({ where: { id } });
  }

  create(post: Tag): Promise<Tag> {
    return this.tagRepository.save(post);
  }

  async update(id: string, post: Tag): Promise<Tag> {
    await this.tagRepository.update(id, { ...post, updated_at: new Date() });
    return this.findOne(id);
  }

  async remove(id: string): Promise<Tag> {
    await this.tagRepository.update(id, { deleted_at: new Date() });
    return this.findOne(id);
  }
}
