import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from 'src/models/role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private roleModel: typeof RoleModel
  ) { }

  async getRoles() {
    return await this.roleModel.findAll()
  }
}
