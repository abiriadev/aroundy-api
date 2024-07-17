import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { match, P } from 'ts-pattern';
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { AuthService } from './auth.service';

export const cookieKey = 'AUTHORIZATION';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Array<Role>>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true;

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    if (!this.authService.verifyToken(token)) return false;

    // TODO: this is naive, demonstration-only implementation:
    // current implementation assumes the cookie value will be either 'admin' or 'user' which are plaintexts.
    // It should be token issued by firebase, and should be verified by firebase admin SDK here.
    // Also, we should know whether the incoming requet has admin or user role.
    // If it has user role, we have to register `userId` property to the request object
    // so that we can access the userId information it in the controller via `@UserId`.
    return match([token, roles])
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
