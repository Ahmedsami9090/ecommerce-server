import { Module } from '@nestjs/common';
import { DbRepoService } from 'src/DB/repository/db.repository.service';
import { userModel } from 'src/DB/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [userModel],
  controllers: [AuthController],
  providers: [AuthService, DbRepoService, JwtService]
})
export class AuthModule { }
