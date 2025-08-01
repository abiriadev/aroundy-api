import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/auth/roles.decorator';
import { Role } from '@/auth/roles.enum';

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
  @ApiTags('App', 'Admin')
  @Get()
  @ApiOperation({
    summary: '카테고리 목록 조회',
    operationId: 'fetchCategories',
  })
  async fetch(): Promise<Array<CategoryDto>> {
    return await this.categoryService.fetch();
  }

  /**
   * 주어진 이름으로 새 카테고리를 생성합니다.
   *
   * 같은 이름의 카테고리가 이미 존재하는 경우, 예외가 발생합니다.
   */
  @ApiTags('Admin')
  @Post()
  @ApiCookieAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: '카테고리 추가', operationId: 'createCategory' })
  async create(@Body() category: CategoryDto.Create) {
    await this.categoryService.create(category);
  }
}
