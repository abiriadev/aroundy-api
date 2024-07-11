import { Identifiable } from '@/common/identifiable.dto';
import { OmitType, PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, IsUrl } from 'class-validator';

export class CompanyDto extends Identifiable {
  static name = 'Company';

  /**
   * 회사 등록일
   */
  @IsDate()
  createdAt: Date;

  /**
   * 회사 정보 갱신일
   */
  @IsDate()
  updatedAt: Date;

  /**
   * 회사명 또는 법인명.
   *
   * 모든 회사는 고유한 이름을 가지며, 중복될 수 없습니다.
   *
   * @example Aroundy
   */
  @IsString()
  name: string;

  /**
   * 회사 로고 이미지 URL
   *
   * @example https://example.com/logo.png
   */
  @IsUrl()
  @IsOptional()
  logo: string | null;
}

export namespace CompanyDto {
  export class Create extends OmitType(CompanyDto, [
    'id',
    'createdAt',
    'updatedAt',
  ] as const) {
    static name = 'Company Create';
  }

  export class Update extends PartialType(Create) {
    static name = 'Company Update';
  }

  export class Query {
    /**
     * 기업 검색에 사용할 검색어
     *
     * 리얼타임 검색 UI를 위해 존재합니다.
     *
     * @example 스타벅
     */
    @IsString()
    @IsOptional()
    q?: string;
  }
}
