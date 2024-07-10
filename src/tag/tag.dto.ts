import { Identifiable } from '@/common/identifiable.dto';
import { OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TagDto extends Identifiable {
  static name = 'Tag';

  /**
   * 태그명
   *
   * @example 할인
   */
  @IsString()
  name: string;
}

export namespace TagDto {
  export class Create extends OmitType(TagDto, ['id'] as const) {
    static name = 'Tag Create';
  }
}
