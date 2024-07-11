import { IsDate, IsString, IsUUID, ValidateNested } from 'class-validator';
import { PostDto } from '@/post/post.dto';

export type Coordinate = [number, number];

export class UserDto {
  static name = 'User';

  // NOTE: 유저 스키마만 id가 아니라 uid를 사용해서 `Identifiable`을 상속받지 않습니다.`
  /**
   * 고유 ID
   *
   * @example "429b20b3-4df8-42da-8e40-e3816504792c"
   */
  @IsUUID()
  uid: string;

  /**
   * 해당 유저가 가입한 날짜.
   */
  @IsDate()
  createdAt: Date;

  /**
   * 해당 유저의 정보가 갱신된 날짜.
   */
  @IsDate()
  updatedAt: Date;

  /**
   * 가입 시 사용한 OAuth 제공업체
   *
   * @example google
   */
  @IsString()
  oauthProvider: string;

  /**
   * 최근 로그인 시각
   */
  @IsDate()
  recentlyLoggedInAt: Date;
}

export namespace UserDto {
  export class Profile extends UserDto {
    static name = 'User Profile';

    /**
     * 해당 유저가 저장한 북마크 목록
     */
    @ValidateNested()
    saved: Array<PostDto>;
  }
}
