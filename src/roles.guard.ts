import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createParamDecorator } from '@nestjs/common';
import { match, P } from 'ts-pattern';

export enum Role {
  Admin,
  User,
}

export const ROLES_KEY = Symbol('roles');
export const Roles = (...roles: Array<Role>) => SetMetadata(ROLES_KEY, roles);

export const UserId = createParamDecorator((_, { userId }) => userId);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Array<Role>>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true;

    const req = context.switchToHttp().getRequest();

    if (!('AUTHORIZATION' in req.cookies)) return false;

    // TODO: this is naive, demonstration-only implementation:
    // current implementation assumes the cookie value will be either 'admin' or 'user' which are plaintexts.
    // It should be token issued by firebase, and should be verified by firebase admin SDK here.
    // Also, we should know whether the incoming requet has admin or user role.
    // If it has user role, we have to register `userId` property to the request object
    // so that we can access the userId information it in the controller via `@UserId`.
    return match([req.cookies['AUTHORIZATION'], roles])
      .with(
        ['admin', P.when((roles) => roles.includes(Role.Admin))],
        () => true,
      )
      .with(['user', P.when((roles) => roles.includes(Role.User))], () => {
        req.userId = '0';
        return true;
      })
      .otherwise(() => false);
  }
}
