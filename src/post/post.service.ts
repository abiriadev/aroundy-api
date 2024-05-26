import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async create(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async update(id: string, post: Post): Promise<Post> {
    await this.postRepository.update(id, post);
    return this.postRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    await this.postRepository.delete(id);
    return post;
  }

  async addImages(id: string, images: string[]): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    post.feed_urls = [...(post.feed_urls || []), ...images];
    await this.postRepository.save(post);
    return post;
  }
}
