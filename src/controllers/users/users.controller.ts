import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { Role, Roles } from 'src/services/role/roles.decorator';
import { UserService } from 'src/services/users/users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Roles(Role.admin)
  @Get()
  getUser() {
    return this.userService.getUser()
  }
}
