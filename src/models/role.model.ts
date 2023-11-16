import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import { UserModel } from "./user.model";

@Table({ freezeTableName: true, tableName: 'roles', engine: 'MyISAM' })
export class RoleModel extends Model {
  @Unique
  @AllowNull(false)
  @Column({ type: DataType.CHAR })
  name: string

  @Column
  description: string
}