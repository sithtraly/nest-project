import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import StudentsModel from "./student.model";

@Table({ tableName: 'documents', freezeTableName: true, engine: 'MyISAM' })
export default class DocumentModel extends Model {
  @AllowNull(false)
  @Column
  name: string

  @AllowNull(false)
  @Column
  url: string

  @Column
  studentId: number
}