import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GuardReq } from 'common/types/types';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { DbRepoService } from 'src/DB/repository/db.repository.service';
import { User, UserDocument } from 'src/DB/schema/user.schema';

@Injectable()
export class UserService {
    constructor(private readonly dpRepoService: DbRepoService<UserDocument>) { }

    async getProfile(req: GuardReq, res: Response){
        try {
            const user = await this.dpRepoService.findById(req.user._id)
            if (!user) {
                throw new NotFoundException('User not found')
            }
            res.json(
                {
                    _id : user._id,
                    name : user.fullName,
                    email : user.email,
                    profilePic : user.profilePic,
                    coverPic : user.coverPic
                }
            )
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

}
