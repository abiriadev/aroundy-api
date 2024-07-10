import { OmitType, PartialType } from '@nestjs/swagger';
import { CompanyDto } from '@/company/company.dto';
import { TagDto } from '@/tag/tag.dto';
import { Identifiable } from '@/common/identifiable.dto';
import { CategoryDto } from '@/category/category.dto';
import {
  ArrayMaxSize,
  IsBoolean,
  IsDate,
  IsDateString,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export type Coordinate = [number, number];

export class PostDto extends Identifiable {
  static name = 'Post';

  /**
   * 해당 포스트가 처음으로 생성된 시각.
   *
   * 해당 이벤트 광고가 검색에 노출되기 시작하는 예정 시점인 `publishedAt`과 별개입니다.
   */
  @IsDate()
  createdAt: Date;

  /**
   * 해당 포스트가 마지막으로 수정된 시각.
   */
  @IsDate()
  updatedAt: Date;

  /**
   * 해당 포스트의 제목.
   */
  @MaxLength(16)
  title: string;

  /**
   * 해당 포스트가 속하는 카테고리의 정보.
   */
  @ValidateNested()
  category: CategoryDto;

  /**
   * 해당 포스트를 등록한 기업의 정보.
   */
  @ValidateNested()
  company: CompanyDto;

  /**
   * 해당 광고의 슬라이딩 이미지 URL 목록.
   */
  @IsUrl({}, { each: true })
  @ArrayMaxSize(10)
  feeds: Array<string>;

  /**
   * 해당 포스트의 캡션, 다시 말해 이벤트 광고의 설명.
   */
  @MaxLength(2200)
  caption: string;

  /**
   * 해당 포스트에서 설명하는 행사가 온라인 행사인지 여부.
   *
   * `isOffline`이 `false`인 경우, 본 속성은 반드시 `true`여야 합니다. 역은 성립하지 않습니다.
   */
  @IsBoolean()
  isOnline: boolean;

  /**
   * 해당 포스트에서 설명하는 행사가 오프라인 행사인지 여부.
   *
   * `isOnline`이 `false`인 경우, 본 속성은 반드시 `true`여야 합니다. 역은 성립하지 않습니다.
   *
   * 다시 말해, `isOnline`과 `isOffline`은 동시에 `false` 일 수 없습니다.
   */
  @IsBoolean()
  isOffline: boolean;

  /**
   * 오프라인 행사일 경우, 행사가 진행되는 특정한 위치의 좌표를 나타냅니다.
   */
  @IsOptional()
  location: Coordinate | null;

  /**
   * `location`이 존재할 경우, 해당 위치의 최상위 지역명을 나타냅니다.
   */
  @IsString()
  @IsOptional()
  address1: string | null;

  /**
   * `location`이 존재할 경우, 해당 위치의 2차 지역명을 나타냅니다.
   */
  @IsString()
  @IsOptional()
  address2: string | null;

  /**
   * `location`이 존재할 경우, 해당 위치가 속한 지역을 나타냅니다.
   */
  @IsString()
  @IsOptional()
  region: string | null;

  /**
   * `isOffline`이 `true` 이지만 지점에서 발생하는 이벤트의 경우, 해당 지점의 이름을 나타냅니다.
   */
  @IsString()
  @IsOptional()
  branch: string | null;

  /**
   * 해당 이벤트의 주최측 또는 기업 연락처를 나타냅니다.
   *
   * 놀랍게도 이 정보는 앱 피그마에 전혀 등장하지 않는데 하여튼 있습니다. 왜인진 저도 몰?루.
   */
  @IsPhoneNumber()
  @IsOptional()
  contact: string | null;

  /**
   * 해당 포스트가 처음으로 검색에 노출되기 시작하는 시각을 나타냅니다.
   *
   * 기업은 임의의 시간에 이벤트 포스트를 작성하고 원하는 만큼 수정할 수 있으며, `publishedAt` 속성을 설정함으로써 실제 작성한 이벤트가 언제부터 노출되기 시작할지 결정할 수 있습니다.
   *
   * 이벤트 시작일인 `startedAt`과는 별개입니다.
   */
  @IsDateString()
  // @Type(() => Date)
  publishedAt: Date;

  /**
   * 본 포스트에서 설명하는 이벤트가 시작하는 시간을 나타냅니다.
   */
  @IsDate()
  @IsOptional()
  startedAt: Date | null;

  /**
   * 본 포스트에서 설명하는 이벤트가 종료되는 시간을 나타냅니다.
   */
  @IsDate()
  @IsOptional()
  endedAt: Date | null;

  /**
   * 해당 포스트에서 설명하는 이벤트의 공식 홈페이지, 티켓 판매처 등 추가적인 정보를 안내할 수 있는 외부 링크를 나타냅니다.
   */
  @IsUrl()
  @IsOptional()
  link: string | null;

  /**
   * 누적 조회수.
   */
  @IsInt()
  @Min(0)
  views: number;

  /**
   * 누적 좋아요 수.
   */
  @IsInt()
  @Min(0)
  likes: number;

  /**
   * 해당 포스트를 현재 사용자가 좋아요 표시했는지 여부.
   *
   * 로그아웃 상태에서는 항상 `false`입니다.
   */
  @IsBoolean()
  liked: boolean;

  /**
   * 해당 포스트를 현재 사용자가 북마크에 저장했는지 여부.
   *
   * 로그아웃 상태에서는 항상 `false`입니다.
   */
  @IsBoolean()
  saved: boolean;

  /**
   * 해당 포스트와 연관된 태그 정보입니다.
   */
  @ArrayMaxSize(5)
  @ValidateNested()
  tags: Array<TagDto>;
}

export namespace PostDto {
  export class Create extends OmitType(PostDto, [
    'id',
    'createdAt',
    'updatedAt',
    'category',
    'company',
    'address1',
    'address2',
    'region',
    'views',
    'likes',
    'liked',
    'saved',
    'tags',
  ] as const) {
    static name = 'Category Create';
    /**
     * 해당 포스트가 속하는 카테고리의 ID.
     */
    @IsUUID()
    categoryId: string;

    /**
     * 해당 포스트를 등록하는 회사의 ID.
     */
    @IsUUID()
    companyId: string;

    /**
     * 해당 포스트가 가질 태그의 ID 목록입니다.
     */
    @ArrayMaxSize(5)
    @IsUUID(undefined, { each: true })
    tagIds: Array<string>;
  }

  export class Update extends PartialType(Create) {}
}
