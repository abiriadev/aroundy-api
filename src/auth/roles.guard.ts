import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { match, P } from 'ts-pattern';
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { AuthService } from './auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<Array<Role>>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true;

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    const { auth, role, uid } = await this.authService.verifyToken(token);
    if (!auth) return false;

    req.uid = uid;

    return match(roles)
      .with([Role.Admin], () => role === Role.Admin)
      .with([Role.User], () => true)
      .with(
        [Role.Admin, Role.User],
        () => role === Role.Admin || role === Role.User,
      )
      .otherwise(() => false);
  }
}
