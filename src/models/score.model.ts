import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import SubjectModel from "./subject.model";
import StudentsModel from "./student.model";

@Table({ tableName: 'scores', freezeTableName: true, engine: 'MyISAM' })
export default class ScoreModel extends Model {
  @AllowNull(false)
  @Column
  score: number

  @ForeignKey(() => SubjectModel)
  @Column
  subjectId: number

  @ForeignKey(() => StudentsModel)
  @Column
  studentId: number

  @BelongsTo(() => StudentsModel)
  studentModel: StudentsModel

  @BelongsTo(() => SubjectModel)
  subjectModel: SubjectModel
}