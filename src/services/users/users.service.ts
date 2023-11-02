import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
}
