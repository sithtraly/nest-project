import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { RoleService } from 'src/services/profile/role.service';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Authentiaction')
@Controller('role')
export class ProfileController {
  constructor(
    private profileService: RoleService
  ) {}

  @Get()
  getProfile() {
    return this.profileService.getRoles()
  }
}
