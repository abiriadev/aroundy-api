import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Identifiable } from '@/common/identifiable.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  fetch() {
    return this.userService.fetch();
  }

  @Delete(':id')
  remove(@Param() { id }: Identifiable) {
    return this.userService.remove(id);
  }
}
