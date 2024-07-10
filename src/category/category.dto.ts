import { Identifiable } from '@/common/identifiable';
import { OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryDto extends Identifiable {
  static name = 'Category';

  /**
   * 카테고리 이름
   */
  @IsString()
  name: string;
}

export namespace CategoryDto {
  export class Create extends OmitType(CategoryDto, ['id'] as const) {
    static name = 'Category Create';
  }
}
