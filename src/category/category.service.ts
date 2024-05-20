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

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  create(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async update(id: string, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, {
      ...category,
      updated_at: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<Category> {
    await this.categoryRepository.update(id, { deleted_at: new Date() });
    return this.findOne(id);
  }
}
