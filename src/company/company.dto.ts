import { OmitType, PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class QueryDto {
  /**
   * 검색어
   */
  @IsString()
  @IsOptional()
  q: string;
}

export class CompanyDto {
  /**
   * 회사 고유 ID
   */
  @IsUUID()
  id: string;

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
   */
  @IsString()
  name: string;

  /**
   * 회사 로고 이미지 URL
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
  ] as const) {}

  export class Update extends PartialType(Create) {}
}
