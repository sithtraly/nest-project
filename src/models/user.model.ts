import { Column, Model, Table, Unique } from "sequelize-typescript";

@Table({freezeTableName: true, tableName: 'users'})
export class UserModel extends Model {
  @Column
  familyName: String
  
  @Column
  callingName: String

  @Column
  gender: String

  @Column
  dob: Date

  @Unique
  @Column
  username: String

  @Column
  password: String

  @Column({defaultValue: true})
  isActive: boolean
}