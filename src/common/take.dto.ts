import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';

export const takeLimit = 64;

export class Take {
  /**
   * 한번에 총 몇 개의 항목을 가져올지 결정합니다.
   *
   * 생략했을 경우 `64`입니다.
   *
   * @example 64
   */
  @IsInt()
  @IsPositive()
  @Max(takeLimit)
  @IsOptional()
  take?: number;

  /**
   * 다음 데이터를 가져올지 이전 데이터를 가져올지 페이지 방향을 결정합니다.
   *
   * 생략했을 경우 `forward`입니다.
   */
  @IsOptional()
  direction?: Take.Direction;

  toRawTake() {
    return (
      (this.take ?? takeLimit) *
      (this.direction === Take.Direction.Backward ? -1 : 1)
    );
  }
}

export namespace Take {
  export enum Direction {
    Forward = 'forward',
    Backward = 'backward',
  }
}
