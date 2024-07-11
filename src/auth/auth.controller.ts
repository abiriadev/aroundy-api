import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  // WARN: firebase auth를 씀에 따라 제거되거나 할 수 있습니다. 장식이라고 생각해주세요.
  /**
   * 회원가입.
   */
  @Post('/signup')
  @ApiOperation({ summary: '회원가입' })
  async signup() {
    // todo!()
  }

  /**
   * 로그인.
   */
  @Post('/signin')
  @ApiOperation({ summary: '로그인' })
  async signin() {
    // todo!()
  }
}
