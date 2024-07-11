import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Identifiable } from '@/common/identifiable.dto';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetch(): Promise<Array<UserDto>> {
    return this.userService.fetch();
  }

  @Delete(':id')
  async remove(@Param() { id }: Identifiable) {
    return this.userService.remove(id);
  }
}
