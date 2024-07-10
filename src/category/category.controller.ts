import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 모든 카테고리 조회.
   *
   * 메뉴 바에서 카테고리 목록을 표시할 때 사용합니다.
   *
   * 기본적으로 각 카테고리가 생성된 순서대로 정렬되어 반환됩니다.
   */
  @Get()
  async findAll(): Promise<Array<CategoryDto>> {
    return await this.categoryService.findAll();
  }

  /**
   * 카테고리 추가.
   */
  @Post()
  async create(@Body() category: CategoryDto.Create) {
    await this.categoryService.create(category);
  }
}
