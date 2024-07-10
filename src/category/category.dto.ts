import { OmitType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CategoryDto {
  /**
   * 카테고리 고유 ID
   */
  @IsUUID()
  id: string;

  /**
   * 카테고리 이름
   */
  @IsString()
  name: string;
}

export namespace CategoryDto {
  export class Create extends OmitType(CategoryDto, ['id'] as const) {}
}
