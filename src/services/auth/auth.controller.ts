import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModel } from "src/models/user.model";
import { AuthGuard } from "./auth.guard";
import { NewUserDto, UserLoginDto } from "src/DTO/user.dto";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags('Authentiaction')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @ApiBody({ type: UserLoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: UserLoginDto) {
    return this.authService.login(body.username, body.password)
  }

  @ApiBody({ type: NewUserDto })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() body: NewUserDto) {
    return await this.authService.register(body)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req: any) {
    const id = req.user.id
    return this.authService.getProfile(id)
  }
}