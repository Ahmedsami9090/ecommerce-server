import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userModel } from 'src/DB/schema/user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { DbRepoService } from 'src/DB/repository/db.repository.service';

@Module({
  imports : [userModel],
  controllers: [UserController],
  providers: [UserService, JwtService, DbRepoService]
})
export class UsersModule {}
