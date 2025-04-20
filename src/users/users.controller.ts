import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthenticationGuard } from 'common/guards/authentication.guard';
import {
  AuthenticationGuardReq,
  RoleEnum,
} from 'common/types/types';
import { Response } from 'express';
import {
  ConfirmEmailDto,
  ForgotPasswordDto,
  freezeAccountDto,
  otpResendDto,
  ResetPasswordDto,
} from './DTO/userDto';
import { Roles } from 'common/decorators/Roles.decorator';
import { AuthorizationGuard } from 'common/guards/authorization.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthenticationGuard)
  getProfile(@Req() req: AuthenticationGuardReq, @Res() res: Response) {
    return this.userService.getProfile(req, res);
  }

  @Post('confirm')
  confirmEmail(@Body() body: ConfirmEmailDto, @Res() res: Response) {
    return this.userService.confirmEmail(body, res);
  }

  @Post('password-forgot')
  forgotPassword(@Body() body: ForgotPasswordDto, @Res() res: Response) {
    return this.userService.forgotPassword(body, res);
  }

  @Put('password-reset')
  resetPassword(@Body() body: ResetPasswordDto, @Res() res: Response) {
    return this.userService.resetPassword(body, res);
  }

  @Put('freeze/:userId')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  freezeAccount(@Param() params: freezeAccountDto) {
    return this.userService.freezeAccount(params);
  }

  @Delete()
  @UseGuards(AuthenticationGuard)
  deleteAccount(@Req() req: AuthenticationGuardReq) {
    return this.userService.deleteAccount(req);
  }

  @Put('otp-resend')
  otpResend(@Body() body: otpResendDto) {
    return this.userService.otpResend(body);
  }
}
