import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { NewUserDto } from 'src/DTO/user.dto';
import { UserModel } from 'src/models/user.model';

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

  async register(data: NewUserDto) {
    let password: string
    if (data.password) {
      password = this.bcryptService.hash(data.password)
    }
    return await this.userService.newUser({ ...data, password })
  }

  async getProfile(id: number) {
    const data: any = await UserModel.sequelize.query(`SELECT u.*, r.name role  FROM users u JOIN roles r ON u.roleId = r.id WHERE u.id = ${id}`)
    const user = data[0][0];
    user.password = undefined
    delete user.password
    return user
  }
}
