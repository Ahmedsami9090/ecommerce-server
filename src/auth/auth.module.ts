import { Module } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { Otp } from 'common/utils/otp';
import { SendEmail } from 'common/utils/sendEmail';
import { UserRepoService } from 'src/DB/repository/users.repository.service';
import { userModel } from 'src/DB/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [userModel, EventEmitterModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService, UserRepoService, JwtService, EventEmitter2, SendEmail, Otp]
})
export class AuthModule { }
