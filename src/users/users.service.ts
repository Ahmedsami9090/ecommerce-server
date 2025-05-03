import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthenticationGuardReq, otpTypes } from 'common/types/types';
import { createHash, verifyHash } from 'common/services/hash';
import { Otp } from 'common/services';
import { Response } from 'express';
import { UpdateQuery } from 'mongoose';
import { UserRepoService } from 'src/DB/repository/users.repository.service';
import { UserDocument } from 'src/DB/schema/user.schema';
import { sendEmailOptions } from 'nodemailer';
import {
  ConfirmEmailDto,
  freezeAccountDto,
  otpResendDto,
  ResetPasswordDto,
} from './DTO/userDto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepoService: UserRepoService,
    private readonly eventEmitter: EventEmitter2,
    private readonly otp: Otp,
  ) {}
  //================================ getProfile ==================================
  async getProfile(user: UserDocument) {
    return {
      _id: user._id,
      name: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    };
  }

  //============================ confirmAccount ==================================
  async confirmEmail(body: ConfirmEmailDto) {
    const user = await this.userRepoService.findOne({
      email: body.email,
      confirmed: false,
    });
    if (!user) {
      throw new NotFoundException('User not found or already confirmed.');
    }
    if (
      !this.otp.verify(user, body.otp) ||
      user.otpFor !== otpTypes.activateAccount
    ) {
      throw new ConflictException('Incorrect OTP.');
    }
    await this.userRepoService.updateOne({ _id: user._id }, {
      confirmed: true,
      $unset: { otp: 1, otpExpireAt: 1, otpFor: 1 },
    } as UpdateQuery<UserDocument>);
    return { message: 'User confirmed' };
  }
  //============================ forgotPassword ==================================
  async forgotPassword(body: Partial<UserDocument>) {
    const user = await this.userRepoService.findOne({
      email: body.email,
      confirmed: true,
      isDeleted: { $exists: false },
      isFreezed: { $exists: false },
    });
    if (!user) {
      throw new NotFoundException('User not found or not confirmed.');
    }
    const { otp, otpExpire } = this.otp.create();
    await this.userRepoService.updateOne(
      { _id: user._id },
      {
        otp: createHash(otp),
        otpExpireAt: otpExpire,
        otpFor: otpTypes.resetPassword,
      },
    );
    const emailOptions: sendEmailOptions = {
      to: user.email,
      subject: 'reset your password',
      html: `<p>please use OTP <b>${otp}</b> to reset your password within 10 minutes.</p>`,
    };
    this.eventEmitter.emit('sendOtp', emailOptions);
    return { message: 'OTP sent to email' };
  }
  //============================ resetPassword ===================================
  async resetPassword(body: ResetPasswordDto) {
    const user = await this.userRepoService.findOne({
      email: body.email,
      confirmed: true,
      isDeleted: { $exists: false },
      isFreezed: { $exists: false },
    });
    if (!user || !user.otp) {
      throw new NotFoundException(
        'User not found/confirmed or no OTP generated',
      );
    }
    const { otp, newPassword } = body;
    if (!verifyHash(otp, user.otp) || user.otpExpireAt < new Date(Date.now())) {
      throw new UnauthorizedException('Invalid OTP or expired');
    }
    await this.userRepoService.updateOne({ _id: user._id }, {
      password: createHash(newPassword),
      $unset: { otp: 1, otpExpireAt: 1, otpFor: 1 },
    } as UpdateQuery<UserDocument>);
    return { message: 'Password updated' };
  }
  //============================= freezeAccount =====================================
  async freezeAccount(params: freezeAccountDto, user: UserDocument) {
    try {
      const _user = await this.userRepoService.findOneAndUpdate(
        {
          _id: params.userId,
          isDeleted: { $exists: false },
          isFreezed: { $exists: false },
        },
        { isFreezed: true, freezedBy: user?._id },
      );
      if (!_user) {
        throw new NotFoundException('User not found or deleted');
      }
      return { message: 'User freezed successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  //============================ deleteAccount ====================================
  async deleteAccount(user: UserDocument) {
    await this.userRepoService.updateOne(
      {
        _id: user._id,
        isDeleted: { $exists: false },
        isFreezed: { $exists: false },
      },
      { isDeleted: true },
    );
    return { message: 'User deleted successfully' };
  }
  //============================= otpResend =================================
  async otpResend(body: otpResendDto) {
    const user = await this.userRepoService.findOne({
      email: body.email,
      isDeleted: { $exists: false },
      isFreezed: { $exists: false },
    });
    if (!user || user.otpExpireAt > new Date()) {
      throw new ConflictException('User not found or OTP not expired yet');
    }
    if (user.confirmed && body.otpFor === otpTypes.activateAccount) {
      throw new UnauthorizedException('Account already activated');
    }
    const { otp, otpExpire } = this.otp.create();
    await this.userRepoService.updateOne(
      { _id: user._id },
      {
        otp: createHash(otp),
        otpExpireAt: otpExpire,
        otpFor: body.otpFor,
      },
    );
    const emailOptions: sendEmailOptions = {
      to: user.email,
      subject: `OTP for ${body.otpFor}`,
      html: `<p>please use OTP <b>${otp}</b> ${body.otpFor} within 10 minutes.</p>`,
    };
    this.eventEmitter.emit('sendOtp', emailOptions);
    return { message: 'OTP sent successfully' };
  }
}
