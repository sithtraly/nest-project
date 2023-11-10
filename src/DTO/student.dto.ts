import { IsNotEmpty } from 'class-validator'

export default class NewStudentDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  gender: string

  @IsNotEmpty()
  dob: string

  fromSecondarySchool: string
  address: string
}

export class updateStudentDto extends NewStudentDto {
  id: number
}