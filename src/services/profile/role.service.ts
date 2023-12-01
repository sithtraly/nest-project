import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewRoleDto, UpdateRoleDto } from 'src/DTO/role.dto';
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

  async newRoles(data: NewRoleDto) {
    try {
      return await RoleModel.create({ ...data })
    } catch (err) {
      throw err
    }
  }

  async updateRole(data: UpdateRoleDto) {
    try {
      const role = await RoleModel.findByPk(data.id)
      if (role) {
        role.name = data.name
        role.description = data.description
        return await role.save()
      }
      else throw new BadRequestException()
    } catch (err) {
      throw err
    }
  }
}
