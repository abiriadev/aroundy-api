import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const ROLES_KEY = Symbol('roles');

export const Roles = (...roles: Array<Role>) => SetMetadata(ROLES_KEY, roles);
