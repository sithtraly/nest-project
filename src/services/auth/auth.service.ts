import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

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
    const payload = { id: user.id, username: user.username }
    user.password = undefined
    return {
      access_token: await this.jwtService.signAsync(payload),
      ...user.dataValues
    }
  }
}
