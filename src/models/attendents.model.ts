import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'attendents', freezeTableName: true, engine: 'MyISAM' })
export default class AttendentModel extends Model {
  @AllowNull(false)
  @Column
  date: string

  @Column({ defaultValue: 'A' })
  type: string

  @Column
  studentId: number
}