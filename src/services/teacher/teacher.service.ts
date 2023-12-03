import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/models/user.model';
import { Utils } from '../utils/utils.service';
import { GetTeacherDTO, NewTeacherDTO } from 'src/DTO/teacher.dto';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(UserModel)
    private model: typeof UserModel,
    private utils: Utils,
    private bcrypt: BcryptService
  ) { }

  async getTeacher(query?: GetTeacherDTO) {
    return await this.model.findAll({ where: { ...this.utils.extractSearchDate(query), roleId: 2 }, attributes: { exclude: ['password'] } }) || []
  }

  async newTeacher(data: NewTeacherDTO) {
    let user = await this.model.findOne({ where: { username: data.username } })
    if (user) throw new BadRequestException(naming.userExist)
    try {
      data.password = this.bcrypt.hash(data.password)
      user = await this.model.create({ ...data })
      user.password = undefined
      delete user.password
      return user
    } catch (err) {
      throw new ServiceUnavailableException()
    }
  }
}
