import { IsOptional, IsUUID } from 'class-validator';
import { Take } from './take.dto';

export class Cursor extends Take {
  /**
   * 이전에 한 번 페이지된 데이터를 요청했다면, 해당 응답에서 전달한 `next` 또는 `prev` 값을 입력합니다.
   *
   * 생략시 데이터의 첫 페이지를 가져옵니다.
   */
  @IsUUID()
  @IsOptional()
  cursor?: string;
}
