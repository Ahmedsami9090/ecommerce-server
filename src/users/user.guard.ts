import { CanActivate, ConflictException, ExecutionContext, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserRepoService } from './../DB/repository/users.repository.service';

@Injectable()
export class IsRegisteredGuard implements CanActivate {

    constructor(private userRepoService: UserRepoService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const email = this.getEmailFromBody(request)
        if (!email) {
            throw new UnauthorizedException()
        }
        try {
            const user = await this.userRepoService.findOne({ email : email, confirmed : true })
            if (!user) {
                throw new ConflictException('Invalid email or user not confirmed')
            }
            request['user'] = user
            return true
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    getEmailFromBody(req: Request) {
        try {
            const { email } = req.body
            return email ? email : undefined
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }
}