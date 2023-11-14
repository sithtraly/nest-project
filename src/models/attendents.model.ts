import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import StudentsModel from "./student.model";

@Table({tableName: 'attendents', freezeTableName: true, engine: 'MyISAM'})
export default class AttendentModel extends Model {
  @AllowNull(false)
  @Column
  date: string

  @Column({defaultValue: 'A'})
  type: string

  @Column
  studentId: number
}