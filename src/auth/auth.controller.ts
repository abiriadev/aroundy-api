import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  // WARN: firebase auth를 씀에 따라 제거되거나 할 수 있습니다. 장식이라고 생각해주세요.
  /**
   * 회원가입.
   */
  @ApiTags('App')
  @Post('/signup')
  @ApiOperation({ summary: '회원가입' })
  async signup() {
    // todo!()
  }

  /**
   * 로그인.
   */
  @ApiTags('App')
  @Post('/signin')
  @ApiOperation({ summary: '로그인' })
  async signin() {
    // todo!()
  }

  /**
   * 어드민 페이지 관리자용 로그인.
   */
  @ApiTags('Admin')
  @Post('/signin/admin')
  @ApiOperation({ summary: '관리자 로그인' })
  async signinAdmin() {
    // todo!()
  }
}
