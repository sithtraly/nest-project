import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetUserDto {
  @ApiProperty({ required: false })
  id: number

  @ApiProperty({ required: false, description: 'format: yyyy-mm-dd' })
  @ApiProperty()
  startDate: string

  @ApiProperty({ required: false, description: 'format: yyyy-mm-dd' })
  @ApiProperty()
  endDate: string
}

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}

export class NewUserDto {
  @ApiProperty()
  @IsNotEmpty()
  familyName: string

  @ApiProperty()
  @IsNotEmpty()
  callingName: string

  @ApiProperty()
  @IsNotEmpty()
  gender: string

  @ApiProperty()
  @IsNotEmpty()
  dob: string

  @ApiProperty()
  @IsNotEmpty()
  username: string

  @ApiProperty({ default: 3 })
  @IsNotEmpty()
  roleId: number

  @ApiProperty({ required: false})
  password: string

  @ApiProperty({ required: false, default: true })
  isActive: boolean
}