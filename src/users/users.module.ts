import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Otp } from 'common/utils/otp';
import { UserRepoService } from 'src/DB/repository/users.repository.service';
import { userModel } from 'src/DB/schema/user.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports : [userModel],
  controllers: [UserController],
  providers: [UserService, JwtService, UserRepoService, Otp]
})
export class UsersModule {}
