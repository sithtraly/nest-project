import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'subjects', freezeTableName: true, engine: 'MyISAM'})
export default class SubjectModel extends Model {
  @AllowNull(false)
  @Column
  subject: string
}