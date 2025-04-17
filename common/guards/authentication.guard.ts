import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'common/types/types';
import { Request } from 'express';
import { UserRepoService } from 'src/DB/repository/users.repository.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepoService: UserRepoService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('token not found');
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_ACCESS,
      });
      const user = await this.userRepoService.findOne({
        _id: payload._id,
        isDeleted: { $exists: false },
        isFreezed: { $exists: false },
      });
      if (!user) {
        throw new NotFoundException('User not found or freezed');
      }
      request['user'] = user;        
    } catch(error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
