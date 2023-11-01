import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { UserService } from 'src/services/users/users.service';

@UseGuards(AuthGuard)
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
