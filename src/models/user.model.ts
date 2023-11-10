import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table, Unique } from "sequelize-typescript";
import { RoleModel } from "./role.model";

@Table({ freezeTableName: true, tableName: 'users', engine: 'MyISAM' })
export class UserModel extends Model {
  @AllowNull(false)
  @Column
  familyName: String

  @AllowNull(false)
  @Column
  callingName: String

  @AllowNull(false)
  @Column
  gender: String

  @AllowNull(false)
  @Column
  dob: Date

  @Unique
  @AllowNull(false)
  @Column
  username: String

  @Column({ defaultValue: '$2b$10$M24aGw2SWPIdL86obQ9tuel/Uacrnd0goiwUfLshv/I1onQRrlHHG' }) // 123
  password: String

  @Column({ defaultValue: true })
  isActive: boolean

  @ForeignKey(() => RoleModel)
  @Column({ defaultValue: 3 })
  roleId: number

  @BelongsTo(() => RoleModel)
  roleModel: RoleModel
}