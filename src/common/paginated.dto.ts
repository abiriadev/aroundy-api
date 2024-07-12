import { IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { mixin } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function paginate<T extends new () => {}>(dto: T) {
  class Paginated {
    /**
     * 검색된 전체 항목 갯수
     */
    @IsNumber()
    total: number;

    /**
     * 다음 페이지 커서.
     *
     * 다음 페이지가 없는 경우 `null`입니다.
     */
    @IsUUID()
    next: string | null;

    /**
     * 이전 페이지 커서.
     *
     * 이전 페이지가 없는 경우 `null`입니다.
     */
    @IsUUID()
    prev: string | null;

    /**
     * 페이지 아이템 배열
     */
    @ValidateNested()
    @ApiProperty({
      isArray: true,
      type: dto,
    })
    items: Array<InstanceType<T>>;
  }

  return mixin(Paginated);
}
