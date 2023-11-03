import { Controller, Get } from '@nestjs/common';
import { RoleService } from 'src/services/profile/role.service';

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
