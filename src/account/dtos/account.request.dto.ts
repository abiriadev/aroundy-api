import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Trim } from 'src/middleware/decorator/public.decorator';

const LOGIN_TYPE_LIST: LoginType[] = ['KAKAO', 'APPLE', 'GOOGLE', 'NAVER'];
type LoginType = 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE';

export class LoginRequestDTO {
  @ApiProperty({
    description: '로그인 유저 고유키',
    example: 456135789,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: '로그인 타입',
    example: 'KAKAO',
    required: true,
    enum: LOGIN_TYPE_LIST,
  })
  @IsString()
  @Trim()
  @IsNotEmpty()
  loginType: LoginType;
}

export class AdminLoginRequestDTO {
  @ApiProperty({
    description: '로그인 이메일',
    example: 'test@example.com',
    required: true,
    type: String,
  })
  @IsString()
  @Trim()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: '로그인 비밀번호',
    example: 'KAKAO',
    required: true,
    type: String,
  })
  @IsString()
  @Trim()
  @IsNotEmpty()
  password: string;
}
