import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'common/decorators/Roles.decorator';
import { RoleEnum } from 'common/types/types';

@Injectable()
export class Authorization implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RoleEnum[]>(
      ROLES_KEY,
      context.getHandler(),
      //   context.getClass(),
    );    
    if (!requiredRoles) {
      return true;
    }    
    const {user} = context.switchToHttp().getRequest()
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
