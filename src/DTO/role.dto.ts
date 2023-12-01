import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty } from "class-validator";

export class NewRoleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string

  @ApiProperty({ required: false })
  description: string
}

export class UpdateRoleDto extends NewRoleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: number
}