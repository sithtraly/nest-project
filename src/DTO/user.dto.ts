import { IsNotEmpty } from "class-validator";

export class UserLoginDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}

export class NewUserDto {
  @IsNotEmpty()
  familyName: string

  @IsNotEmpty()
  callingName: string

  @IsNotEmpty()
  gender: string

  @IsNotEmpty()
  dob: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  roleId: number

  isActive: boolean
  password: string
}