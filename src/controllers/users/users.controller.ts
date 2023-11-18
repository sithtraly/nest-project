import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from 'src/DTO/user.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { Role, Roles } from 'src/services/role/roles.decorator';
import { UserService } from 'src/services/users/users.service';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Authentiaction')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Roles(Role.admin)
  @Get()
  getUser(@Query() query: GetUserDto) {
    console.log(query)
    return this.userService.getUser()
  }
}
