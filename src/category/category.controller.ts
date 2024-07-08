import { Controller, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 카테고리 추가.
   */
  @Post()
  async create(@Body() category: CreateCategoryDto) {
    await this.categoryService.create(category);
  }
}
