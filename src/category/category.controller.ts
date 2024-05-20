import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post()
  create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(id);
  }
}
