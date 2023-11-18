import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class GetSubjectDto {
  @ApiProperty({ required: false })
  id: number

  @ApiProperty({ required: false, description: 'format: yyyy-mm-dd' })
  @ApiProperty()
  startDate: string

  @ApiProperty({ required: false, description: 'format: yyyy-mm-dd' })
  @ApiProperty()
  endDate: string
}

export class NewSubjectDto {
  @ApiProperty()
  @IsNotEmpty()
  subject: string
}

export class UpdateSubjectDto extends NewSubjectDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number
}