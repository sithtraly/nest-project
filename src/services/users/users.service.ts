import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewUserDto } from 'src/DTO/user.dto';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel
  ) { }

  async getUser(): Promise<any> {
    const users = await this.userModel.findAll()
    users.map((user) => {
      user.password = undefined
    })
    return users
  }

  async findUser(username: String) {
    return await this.userModel.findOne({ where: { username } })
  }

  async newUser(data: NewUserDto) {
    let user = await this.userModel.findOne({ where: { username: data.username } })
    if (user) {
      throw new BadRequestException(naming.userExist)
    }
    try {
      user = await this.userModel.create({ ...data })
      user.password = undefined
      delete user.password
      return user
    } catch (err) {
      throw new ServiceUnavailableException()
    }
  }
}
