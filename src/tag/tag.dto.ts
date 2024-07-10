import { OmitType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class TagDto {
  /**
   * 태그 고유 ID
   */
  @IsUUID()
  id: string;

  /**
   * 태그명
   */
  @IsString()
  name: string;
}

export namespace TagDto {
  export class Create extends OmitType(TagDto, ['id'] as const) {}
}
