import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class GetStudentDto {
  @ApiProperty({ required: false })
  id: number

  @ApiProperty({ required: false, description: 'format: yyyy-mm-dd' })
  @ApiProperty()
  startDate: string

  @ApiProperty({ required: false, description: 'format: yyyy-mm-dd' })
  @ApiProperty()
  endDate: string
}

export default class NewStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string

  @ApiProperty()
  @IsNotEmpty()
  lastName: string

  @ApiProperty()
  @IsNotEmpty()
  gender: string

  @ApiProperty({ description: 'format: yyyy-mm-dd' })
  @IsNotEmpty()
  dob: string

  @ApiProperty({ required: false })
  fromSecondarySchool: string

  @ApiProperty({ required: false })
  address: string
}

export class updateStudentDto extends NewStudentDto {
  @ApiProperty()
  id: number
}