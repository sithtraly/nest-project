import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/services/users/users.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}
  @Get()
  getUser() {
    return this.userService.getUser()
  }
}
