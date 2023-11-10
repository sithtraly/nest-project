import { IsNotEmpty } from 'class-validator'

export class NewSubjectDto {
  @IsNotEmpty()
  subject: string
}

export class UpdateSubjectDto extends NewSubjectDto {
  id: number
}