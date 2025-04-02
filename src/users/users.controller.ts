import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthGuardReq, IsRegisteredGuardReq } from 'common/types/types';
import { Response } from 'express';
import { UserDocument } from 'src/DB/schema/user.schema';
import { ConfirmEmailDto, ForgotPasswordDto, ResetPasswordDto } from './DTO/userDto';
import { IsRegisteredGuard } from './user.guard';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() req: AuthGuardReq, @Res() res: Response) {
        return this.userService.getProfile(req, res)
    }

    @Post('confirm')
    confirmEmail(@Body() body: ConfirmEmailDto, @Res() res: Response) {
        return this.userService.confirmEmail(body, res)
    }

    @Post('password-forgot')
    forgotPassword(@Body() body: ForgotPasswordDto, @Res() res: Response) {
        return this.userService.forgotPassword(body, res)
    }

    @Put('password-reset')
    resetPassword(@Body() body: ResetPasswordDto, @Res() res: Response) {
        return this.userService.resetPassword(body, res)
    }
}
