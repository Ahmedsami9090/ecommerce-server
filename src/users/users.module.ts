import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Otp } from 'common/utils/otp';
import { UserRepoService } from 'src/DB/repository/users.repository.service';
import { userModel } from 'src/DB/schema/user.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SendEmail } from 'common/utils/sendEmail';

@Module({
  imports : [userModel],
  controllers: [UserController],
  providers: [UserService, JwtService, UserRepoService, Otp, EventEmitter2, SendEmail]
})
export class UsersModule {}
