import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModel } from "src/models/user.model";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userDto: UserModel) {
    console.log(userDto)
    const err = { message: 'missing field', fields: [], statusCode: '400' }
    if (!userDto.username) err.fields.push('username')
    if (!userDto.password) err.fields.push('password')
    if (err.fields.length > 0) throw new BadRequestException(err)

    return this.authService.login(userDto.username, userDto.password)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const id = req.user.id
    const user = await UserModel.findOne({ where: { id } })
    user.password = undefined
    const data = { ...user.dataValues, ...req.user }
    return data
  }
}