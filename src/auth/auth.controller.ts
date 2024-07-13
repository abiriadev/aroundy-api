import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  // WARN: firebase auth를 씀에 따라 제거되거나 할 수 있습니다. 장식이라고 생각해주세요.
  /**
   * 네이버 소셜 로그인.
   */
  @ApiTags('App')
  @Post('/naver')
  @ApiOperation({ summary: '네이버 소셜 로그인' })
  async naverLogin() {
    // todo!()
  }

  /**
   * 카카오 소셜 로그인.
   */
  @ApiTags('App')
  @Post('/kakao')
  @ApiOperation({ summary: '카카오 소셜 로그인' })
  async kakaoLogin() {
    // todo!()
  }
}
