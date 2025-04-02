import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { createHash, verifyHash } from 'common/utils/hash';
import { Otp } from 'common/utils/otp';
import { Response } from 'express';
import { sendEmailOptions } from 'nodemailer';
import { UserDocument } from 'src/DB/schema/user.schema';
import { UserRepoService } from '../DB/repository/users.repository.service';

@Injectable()
export class AuthService {
    constructor(private readonly userRepoService: UserRepoService,
        private readonly jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2,
        private readonly otp: Otp
    ) { }
    //============================ signup ==========================================
    async signup(body: Partial<UserDocument>, res: Response) {
        try {
            const assignedOtp = this.otp.create()
            const user = await this.userRepoService.create({
                ...body,
                otp: createHash(assignedOtp.otp),
                otpExpireAt: assignedOtp.otpExpire
            }
            )
            const emailOptions: sendEmailOptions = {
                to: user.email,
                subject: "verify your account",
                html: `<p>please use OTP <b>${assignedOtp.otp}</b> to confirm your account within 10 minutes.</p>`
            }
            this.eventEmitter.emit('sendOtp', emailOptions)
            res.json({ message: 'User created successfully' })
        } catch (error) {
            if (error.errorResponse.code === 11000) {
                throw new UnauthorizedException('Email is already registered')
            } else {
                throw new InternalServerErrorException(error)
            }
        }
    }
    //============================ login ===========================================
    async login(body: Partial<UserDocument>, res: Response) {
        try {
            const user = await this.userRepoService.findOne({ email: body.email, confirmed: true })
            if (!user) {
                throw new BadRequestException('User not found or not confirmed.')
            }
            const isPasswordCorrect = verifyHash(body.password!, user?.password)
            if (!isPasswordCorrect) {
                throw new BadRequestException('email or password incorrect')
            }
            const accessToken = this.jwtService.sign(
                { email: user.email, _id: user._id },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '2h'
                }
            )
            const refreshToken = this.jwtService.sign(
                { email: user.email, _id: user._id },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '7d'
                }
            )
            res.json({ accessToken, refreshToken })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

}
// errorResponse.code