import { AllowNull, Column, Model, Table, Unique } from "sequelize-typescript";

@Table({ freezeTableName: true, tableName: 'users', engine: 'MyISAM' })
export class UserModel extends Model {
  @AllowNull(false)
  @Column
  familyName: string

  @AllowNull(false)
  @Column
  callingName: string

  @AllowNull(false)
  @Column
  gender: string

  @AllowNull(false)
  @Column
  dob: Date

  @Unique
  @AllowNull(false)
  @Column
  username: string

  @Column({ defaultValue: '$2b$10$M24aGw2SWPIdL86obQ9tuel/Uacrnd0goiwUfLshv/I1onQRrlHHG' }) // 123
  password: string

  @Column({ defaultValue: true })
  isActive: boolean

  @Column
  roleId: number
}