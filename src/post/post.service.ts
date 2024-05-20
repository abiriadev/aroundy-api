import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  create(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async update(id: string, post: Post): Promise<Post> {
    await this.postRepository.update(id, { ...post, updated_at: new Date() });
    return this.findOne(id);
  }

  async remove(id: string): Promise<Post> {
    await this.postRepository.update(id, { deleted_at: new Date() });
    return this.findOne(id);
  }
}
