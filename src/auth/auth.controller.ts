import { Controller, Post, Headers } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 네이버 소셜 로그인.
   */
  @ApiTags('App')
  @Post('/naver')
  @ApiOperation({ summary: '네이버 소셜 로그인' })
  async naverLogin(@Headers('authorization') authHeader: string) {
    const token = this.extractTokenFromHeader(authHeader);
    const uid = await this.authService.getNaverUser(token);
    const customToken = await this.authService.createCustomToken(uid);
    return { customToken };
  }

  /**
   * 카카오 소셜 로그인.
   */
  @ApiTags('App')
  @Post('/kakao')
  @ApiOperation({ summary: '카카오 소셜 로그인' })
  async kakaoLogin(@Headers('authorization') authHeader: string) {
    const token = this.extractTokenFromHeader(authHeader);
    const uid = await this.authService.getKakaoUser(token);
    const customToken = await this.authService.createCustomToken(uid);
    return { customToken };
  }

  private extractTokenFromHeader(authHeader: string): string {
    if (!authHeader) {
      return '';
    }
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
    return '';
  }
}
