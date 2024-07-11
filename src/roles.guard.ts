import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createParamDecorator } from '@nestjs/common';

export enum Role {
  Admin,
  User,
}

export const ROLES_KEY = Symbol('roles');
export const Roles = (...roles: Array<Role>) => SetMetadata(ROLES_KEY, roles);

export const UserId = createParamDecorator((_, { user }) => user);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Array<Role>>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.table(roles);
    if (!roles) return true;

    const {} = context.switchToHttp().getRequest();
    return false;
  }
}
