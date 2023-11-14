import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import SubjectModel from "./subject.model";
import StudentsModel from "./student.model";

@Table({ tableName: 'scores', freezeTableName: true, engine: 'MyISAM' })
export default class ScoreModel extends Model {
  @AllowNull(false)
  @Column
  score: number

  @Column
  subjectId: number

  @Column
  studentId: number
}