import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'qrCode', freezeTableName: true, engine: 'MyISAM' })
export class QrCodeModel extends Model {
  @AllowNull(false)
  @Column
  file: string

  @AllowNull(false)
  @Column
  lat1: number

  @AllowNull(false)
  @Column
  lat2: number

  @AllowNull(false)
  @Column
  lon1: number

  @AllowNull(false)
  @Column
  lon2: number

  @AllowNull(false)
  @Column
  owner: number
}