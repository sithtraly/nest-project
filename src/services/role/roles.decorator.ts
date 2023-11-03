import { SetMetadata } from "@nestjs/common"

export enum Role {
  admin = 1,
  teacher = 2,
  student = 3
}

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)