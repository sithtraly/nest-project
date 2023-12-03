import { ApiProperty } from "@nestjs/swagger"
import { GetUserDto, NewUserDto } from "./user.dto"
import { IsNotEmpty } from "class-validator"

export class GetTeacherDTO extends GetUserDto { }

export class NewTeacherDTO extends NewUserDto {
  @ApiProperty({ default: 2 })
  @IsNotEmpty()
  roleId: number
}