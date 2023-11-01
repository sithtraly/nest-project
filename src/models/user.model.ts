import { AllowNull, Column, ForeignKey, Model, Table, Unique } from "sequelize-typescript";
import { ProfileModel } from "./profile.model";

@Table({ freezeTableName: true, tableName: 'users' })
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

  @Column({ defaultValue: 3 })
  profileId: number
}