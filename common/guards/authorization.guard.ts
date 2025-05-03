import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticationGuard } from './authentication.guard';
import { Authorization } from './authorization';

@Injectable()
export default class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly authentication: AuthenticationGuard,
    private readonly authorization: Authorization,
  ) {}
  async canActivate(context: ExecutionContext) {
    await this.authentication.canActivate(context);
    return this.authorization.canActivate(context);
  }
}
