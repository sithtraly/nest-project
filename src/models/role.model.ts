import { AllowNull, Column, Model, Table, Unique } from "sequelize-typescript";

@Table({freezeTableName: true, tableName: 'roles'})
export class RoleModel extends Model {
  @Unique
  @AllowNull(false)
  @Column
  name: string

  @Column
  description: string
}