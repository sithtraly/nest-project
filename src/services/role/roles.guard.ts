import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "../auth/auth.guard";
import { UserService } from "../users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflextor: Reflector,
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflextor.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()])
    if (!requiredRoles) return true
    const request = context.switchToHttp().getRequest()
    const token = AuthGuard.extractTokenFromHeader(request)
    let roleId: any
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: '123' }
      )
      const user = await this.userService.findUser(payload.username)
      roleId = user.dataValues.roleId
    } catch (err) {
      console.log('--------------err--------------')
      console.log(err)
      throw new UnauthorizedException()
    }
    return requiredRoles.some((role: any) => roleId == role)
  }
}