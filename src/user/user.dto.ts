import { Identifiable } from '@/common/identifiable.dto';
import { IsDate, ValidateNested } from 'class-validator';
import { PostDto } from '@/post/post.dto';

export type Coordinate = [number, number];

export class UserDto extends Identifiable {
  static name = 'User';

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
