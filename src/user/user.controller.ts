import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { Roles } from '@/auth/roles.decorator';
import { Role } from '@/auth/roles.enum';
import { UserId } from '@/auth/userid.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 서비스의 전체 유저 목록을 조회합니다.
   */
  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: '가입한 유저 목록 조회' })
  async fetch(): Promise<Array<UserDto>> {
    return this.userService.fetch();
  }

  /**
   * 현재 로그인한 유저의 프로필 정보를 조회합니다.
   */
  @Get('profile')
  @Roles(Role.User)
  @ApiOperation({ summary: '로그인한 유저 프로필 조회' })
  async profile(@UserId() userId: string): Promise<UserDto.Profile> {
    return this.userService.profile(userId);
  }

  /**
   * 현재 로그인한 유저의 계정을 삭제합니다.
   */
  @Delete()
  @Roles(Role.User)
  @ApiOperation({ summary: '회원 탈퇴' })
  async remove(@UserId() userId: string) {
    return this.userService.remove(userId);
  }
}
