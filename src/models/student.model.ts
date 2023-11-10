import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'students', freezeTableName: true, engine: 'MyISAM'})
export default class StudentsModel extends Model {
  @AllowNull(false)
  @Column
  firstName: string

  @AllowNull(false)
  @Column
  lastName: string

  @AllowNull(false)
  @Column
  gender: string

  @AllowNull(false)
  @Column
  dob: string

  @Column
  fromSecondarySchool: string

  @Column
  address: string
}