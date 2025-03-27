import {
    Controller,
    Get,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GuardReq } from 'common/types/types';
import { Response } from 'express';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() req : GuardReq, @Res() res : Response){
        return this.userService.getProfile(req, res)
    }

}
