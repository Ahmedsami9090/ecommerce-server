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
import AuthorizationGuard from 'common/guards/authorization.guard';
import { User } from 'common/decorators/User.decorator';
import { UserDocument } from 'src/DB/schema/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthenticationGuard)
  getProfile(@Req() {user}: AuthenticationGuardReq) {
    return this.userService.getProfile(user);
  }

  @Post('confirm')
  confirmEmail(@Body() body: ConfirmEmailDto) {
    return this.userService.confirmEmail(body);
  }

  @Post('password-forgot')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.userService.forgotPassword(body);
  }

  @Put('password-reset')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.userService.resetPassword(body);
  }

  @Put('freeze/:userId')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthorizationGuard)
  freezeAccount(@Param() params: freezeAccountDto, @User() user : UserDocument) {
    return this.userService.freezeAccount(params, user);
  }

  @Delete()
  @UseGuards(AuthenticationGuard)
  deleteAccount(@User() user: UserDocument) {
    return this.userService.deleteAccount(user);
  }

  @Put('otp-resend')
  otpResend(@Body() body: otpResendDto) {
    return this.userService.otpResend(body);
  }
}
