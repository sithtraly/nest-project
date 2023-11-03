import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    private jwtService: JwtService
  ) { }

  async login(username: String, password: String) {
    const user = await this.userService.findUser(username)
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!this.bcryptService.compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    user.password = undefined
    user.dob = undefined
    user.createdAt = undefined
    user.updatedAt = undefined
    user.isActive = undefined
    return {
      access_token: await this.jwtService.signAsync(user.dataValues),
      ...user.dataValues
    }
  }
}
