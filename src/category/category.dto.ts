import { OmitType } from '@nestjs/swagger';

export class CategoryDto {
  /**
   * 카테고리 고유 ID
   */
  id: string;

  /**
   * 카테고리 이름
   */
  name: string;
}

export namespace CategoryDto {
  export class Create extends OmitType(CategoryDto, ['id'] as const) {}
}
