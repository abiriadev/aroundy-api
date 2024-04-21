import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Trim } from 'src/middleware/decorator/public.decorator';

const LOGIN_TYPE_LIST: LoginType[] = ['KAKAO', 'APPLE', 'GOOGLE', 'NAVER'];
type LoginType = 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE';

export class LoginRequestDTO {
  @ApiProperty({
    description: '로그인 유저 고유키',
    example: '456135789',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: '로그인 유저 타입',
    example: 'KAKAO',
    required: true,
    enum: LOGIN_TYPE_LIST,
  })
  @IsString()
  @Trim()
  @IsNotEmpty()
  loginType: LoginType;
}
