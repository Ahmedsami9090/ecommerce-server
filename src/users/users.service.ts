import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GuardReq } from 'common/types/types';
import { Otp } from 'common/utils/otp';
import { Response } from 'express';
import { UpdateQuery } from 'mongoose';
import { UserRepoService } from 'src/DB/repository/users.repository.service';
import { UserDocument } from 'src/DB/schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepoService: UserRepoService,
        private readonly otp: Otp
    ) { }
    //================================ getProfile ==================================
    async getProfile(req: GuardReq, res: Response) {
        try {
            const user = await this.userRepoService.findById(req.user._id)
            if (!user) {
                throw new NotFoundException('User not found')
            }
            res.json(
                {
                    _id: user._id,
                    name: user.fullName,
                    email: user.email,
                    profilePic: user.profilePic
                }
            )
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    //============================ confirmAccount ==================================
    async confirmEmail(body: Partial<UserDocument>, res: Response) {
        const user = await this.userRepoService.findOne({ email: body.email })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        if (!this.otp.verify(user, body.otp)) {
            throw new ConflictException('Incorrect OTP.')
        }
        await this.userRepoService.updateOne({ _id: user._id }, {
            confirmed: true,
            $unset: { otp: 1, otpExpireAt: 1 }
        } as UpdateQuery<UserDocument>
        )
        res.json({ message: 'User confirmed' })
    }
}
