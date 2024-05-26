import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async create(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async update(id: string, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Category> {
    const category = await this.findOne(id);
    await this.categoryRepository.delete(id);
    return category;
  }
}
