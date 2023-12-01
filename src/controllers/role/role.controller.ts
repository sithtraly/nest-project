import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewRoleDto, UpdateRoleDto } from 'src/DTO/role.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { RoleService } from 'src/services/profile/role.service';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Authentiaction')
@Controller('role')
export class ProfileController {
  constructor(
    private roleService: RoleService
  ) { }

  @Get()
  getProfile() {
    return this.roleService.getRoles()
  }

  @Post()
  newRole(@Body() body: NewRoleDto) {
    return this.roleService.newRoles(body)
  }

  @Put()
  uppateRole(@Body() body: UpdateRoleDto) {
    return this.roleService.updateRole(body)
  }
}
