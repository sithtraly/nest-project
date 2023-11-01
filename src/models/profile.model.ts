import { AllowNull, Column, Model, Table, Unique } from "sequelize-typescript";

@Table({freezeTableName: true, tableName: 'profile'})
export class ProfileModel extends Model {
  @Unique
  @AllowNull(false)
  @Column
  name: string

  @Column
  description: string
}