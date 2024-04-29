import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from 'src/middleware/decorator/public.decorator';

import {
  AdminLoginRequestDTO,
  LoginRequestDTO,
} from './dtos/account.request.dto';
import { TokenResponseDTO } from './dtos/account.response.dto';
import { AccountService } from './account.service';

@ApiTags('회원관리 API')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginRequestDTO })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: TokenResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: '잘못된 요청입니다.',
  })
  @Public()
  @Post('/login')
  login(@Body() body: LoginRequestDTO): void {
    this.accountService.login(body);
  }

  @ApiOperation({ summary: '어드민 로그인' })
  @ApiBody({ type: AdminLoginRequestDTO })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: TokenResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: '잘못된 요청입니다.',
  })
  @Public()
  @Post('/admin/login')
  adminLogin(@Body() body: AdminLoginRequestDTO): void {
    this.accountService.adminLogin(body);
  }
}
