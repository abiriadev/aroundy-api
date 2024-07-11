import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Identifiable } from '@/common/identifiable.dto';
import { UserDto } from './user.dto';
import { Roles } from '@/auth/roles.decorator';
import { Role } from '@/auth/roles.enum';
import { UserId } from '@/auth/userid.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetch(): Promise<Array<UserDto>> {
    return this.userService.fetch();
  }

  @Get('profile')
  @Roles(Role.User)
  async profile(@UserId() userId: string): Promise<UserDto.Profile> {
    return this.userService.profile(userId);
  }

  @Delete(':id')
  async remove(@Param() { id }: Identifiable) {
    return this.userService.remove(id);
  }
}
