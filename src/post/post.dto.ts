import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
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
  Validate,
  ValidateNested,
} from 'class-validator';
import { paginate } from '@/common/paginated.dto';
import { Coordinate, IsCoordinate } from './coordinate.dto';

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
   *
   * @example "몰티저스 스페셜 팝업"
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
   *
   * @example ['https://example.com/image1.png', 'https://example.com/image2.png', 'https://example.com/image3.png']
   */
  @IsUrl({}, { each: true })
  @ArrayMaxSize(10)
  feeds: Array<string>;

  /**
   * 해당 포스트의 캡션, 다시 말해 이벤트 광고의 설명.
   *
   * @example "🎉 몰티저스 스페셜 팝업 이벤트에 여러분을 초대합니다! 🎉"
   */
  @MaxLength(2200)
  caption: string;

  /**
   * 해당 포스트에서 설명하는 행사가 온라인 행사인지 여부.
   *
   * `isOffline`이 `false`인 경우, 본 속성은 반드시 `true`여야 합니다. 역은 성립하지 않습니다.
   *
   * @example true
   */
  @IsBoolean()
  isOnline: boolean;

  /**
   * 해당 포스트에서 설명하는 행사가 오프라인 행사인지 여부.
   *
   * `isOnline`이 `false`인 경우, 본 속성은 반드시 `true`여야 합니다. 역은 성립하지 않습니다.
   *
   * 다시 말해, `isOnline`과 `isOffline`은 동시에 `false` 일 수 없습니다.
   *
   * @example true
   */
  @IsBoolean()
  isOffline: boolean;

  /**
   * 오프라인 행사일 경우, 행사가 진행되는 특정한 위치의 좌표를 나타냅니다.
   *
   * @example [37.51264278891025, 127.10246789395465]
   */
  @Validate(IsCoordinate)
  @IsOptional()
  location: Coordinate | null;

  /**
   * `location`이 존재할 경우, 해당 위치의 최상위 지역명을 나타냅니다.
   *
   * @example 서울
   */
  @IsString()
  @IsOptional()
  address1: string | null;

  /**
   * `location`이 존재할 경우, 해당 위치의 2차 지역명을 나타냅니다.
   *
   * @example 송파구
   */
  @IsString()
  @IsOptional()
  address2: string | null;

  /**
   * `isOffline`이 `true` 이지만 지점에서 발생하는 이벤트의 경우, 해당 지점의 이름을 나타냅니다.
   *
   * @example 스타벅스 코리아
   */
  @IsString()
  @IsOptional()
  branch: string | null;

  /**
   * 해당 이벤트의 주최측 또는 기업 연락처를 나타냅니다.
   *
   * 놀랍게도 이 정보는 앱 피그마에 전혀 등장하지 않는데 하여튼 있습니다. 왜인진 저도 몰?루.
   *
   * @example "01012345678"
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
  publishedAt: Date;

  /**
   * 본 포스트에서 설명하는 이벤트가 시작하는 시간을 나타냅니다.
   */
  @IsDateString()
  @IsOptional()
  startedAt: Date | null;

  /**
   * 본 포스트에서 설명하는 이벤트가 종료되는 시간을 나타냅니다.
   */
  @IsDateString()
  @IsOptional()
  endedAt: Date | null;

  /**
   * 해당 포스트에서 설명하는 이벤트의 공식 홈페이지, 티켓 판매처 등 추가적인 정보를 안내할 수 있는 외부 링크를 나타냅니다.
   *
   * @example https://event.example.com
   */
  @IsUrl()
  @IsOptional()
  link: string | null;

  /**
   * 누적 조회수.
   *
   * @example 1234
   */
  @IsInt()
  @Min(0)
  views: number;

  /**
   * 누적 좋아요 수.
   *
   * @example 5678
   */
  @IsInt()
  @Min(0)
  likes: number;

  /**
   * 해당 포스트를 현재 사용자가 좋아요 표시했는지 여부.
   *
   * 로그아웃 상태에서는 항상 `false`입니다.
   *
   * @example false
   */
  @IsBoolean()
  liked: boolean;

  /**
   * 해당 포스트를 현재 사용자가 북마크에 저장했는지 여부.
   *
   * 로그아웃 상태에서는 항상 `false`입니다.
   *
   * @example false
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
    'views',
    'likes',
    'liked',
    'saved',
    'tags',
  ] as const) {
    static name = 'Post Create';

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

  export class Update extends PartialType(Create) {
    static name = 'Post Update';
  }

  export class Paginated extends paginate(PostDto) {
    static name = 'Post Paginated';
  }

  export enum SearchRange {
    Company = 'company',
    Title = 'title',
    Caption = 'caption',
  }

  export enum Channel {
    Online = 'online',
    Offline = 'offline',
  }

  export enum State {
    Ongoing = 'ongoing',
    Ended = 'ended',
  }

  export enum Sort {
    Latest = 'latest',
    Popular = 'popular',
    StartingSoon = 'starting-soon',
    EndingSoon = 'ending-soon',
  }

  export class Query {
    /**
     * 포스트 검색에 사용할 검색어
     *
     * 해당 검색어는 `range` 속성에 의해 검색을 수행할 범위가 결정됩니다.
     *
     * @example 자가용
     */
    @IsString()
    @IsOptional()
    q?: string;

    /**
     * 주어진 검색어를 포스트의 어느 데이터에서 검색할지 결정합니다.
     *
     * `q` 값이 없는 경우, 본 속성은 아무 의미도 갖지 않습니다.
     *
     * - `company`: 브랜드명에서 검색
     * - `title`: 제목에서 검색
     * - `caption`: 캡션에서 검색
     *
     * 본 속성을 생략하는 경우, 모든 범위를 대상으로 검색합니다.
     *
     * @example title
     */
    @IsOptional()
    range?: SearchRange;

    /**
     * 필터링할 특정 카테고리의 ID.
     *
     * 앱 화면에서 카테고리별로 포스트를 나누기 위해 사용됩니다.
     *
     * 본 속성을 생략하는 경우, 모든 카테고리가 섞여서 반환됩니다.
     *
     * @example "429b20b3-4df8-42da-8e40-e3816504792c"
     */
    @IsUUID()
    @IsOptional()
    category?: string;

    /**
     * 특정 브랜드가 올린 포스트만 검색합니다.
     *
     * 여러 브랜드를 선택할 수 없음에 주의하세요.
     *
     * 본 속성을 생략하는 경우, 특정 브랜드에 한정하지 않는 결과가 반환됩니다.
     *
     * @example "429b20b3-4df8-42da-8e40-e3816504792c"
     */
    @IsUUID()
    @IsOptional()
    company?: string;

    /**
     * 온, 오프라인 등 이벤트의 형태를 기준으로 필터링합니다.
     *
     * - `online`: 온라인 전용 또는 온/오프라인 모두 가능한 이벤트들을 검색합니다.
     * - `offline`: 오프라인 전용 또는 온/오프라인 모두 가능한 이벤트들을 검색합니다.
     *
     * 본 속성을 생략하는 경우, 온/오프라인을 구분하지 않고 모든 이벤트를 검색합니다.
     *
     * 온라인 그리고 오프라인에서 동시에 진행되는 이벤트들 '만' 검색하는 것은 불가능도록 설계되었습니다.
     *
     * @example offline
     */
    @IsOptional()
    channel?: Channel;

    /**
     * 이벤트의 진행 상태, 종료 여부 등을 기준으로 필터링합니다.
     *
     * - `ongoing`: 현재 시점 진행 중인 이벤트만 검색합니다.
     * - `ended`: 이미 종료되어 끝난 이벤트만 검색합니다.
     *
     * 아직 시작하지 않은 이벤트들 '만' 검색하는 것은 불가능하도록 설계되었습니다.
     *
     * 본 속성을 생략하는 경우, 이벤트의 상태에 관계없이 모든 이벤트를 검색합니다.
     *
     * @example ongoing
     */
    @IsOptional()
    state?: State;

    /**
     * 특정 지역에서 열리는 이벤트만 검색합니다.
     *
     * 여러 지역을 동시에 선택할 수 없음에 주의하세요.
     *
     * 본 속성을 지정하면 무조건 오프라인 이벤트들만 검색되며, 본 속성을 생략하는 경우, 온/오프라인 유무 및 지역에 관계없이 모든 이벤트를 검색합니다.
     *
     * @example 서울
     */
    @IsString()
    @IsOptional()
    region?: string;

    /**
     * 검색한 포스트들의 정렬 순서를 결정합니다.
     *
     * - `latest`: 가장 최근에 등록된 순으로 정렬합니다.
     * - `popular`: 인기순으로 정렬합니다. << !NOTE! 동작 미정, 정의되지 않음, 구현되지 않음. UB에 주의.
     * - `starting-soon`: 곧 시작하는 이벤트 순, 즉 시작 예정일이 오늘에 가장 가까운 순으로 정렬합니다. 만약 시작 예정일이 오늘보다 이전인 경우, 오름차순인 것처럼 정렬됩니다.
     * - `ending-soon`: 행사 종료가 임박한 순, 즉 종료 예정일이 오늘에 가장 가까운 순으로 정렬합니다. 만약 종료 예정일이 오늘보다 이전인 경우, 오름차순인 것처럼 정렬됩니다.
     *
     * 기본값은 `latest`입니다.
     *
     * @example latest
     */
    @IsOptional()
    sort?: Sort;
  }
}
