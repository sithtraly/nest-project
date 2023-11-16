import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModel } from "src/models/user.model";
import { AuthGuard } from "./auth.guard";
import { log } from "console";
import { NewUserDto, UserLoginDto } from "src/DTO/user.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: UserLoginDto) {
    return this.authService.login(body.username, body.password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() body: NewUserDto) {
    return await this.authService.register(body)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const id = req.user.id
    log('---------------get profile-----------------')
    console.log(req.user)
    log('---------------get profile-----------------')
    const user = await UserModel.findOne({ where: { id } })
    user.password = undefined
    const data = { ...user.dataValues }
    return data
  }
}