import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { User, UserDocument } from 'src/DB/schema/user.schema';
import { DbRepoService } from '../DB/repository/db.repository.service';
import { verifyHash } from 'common/utils/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly dbRepoService: DbRepoService<UserDocument>,
        private jwtService: JwtService
    ) { }

    async signup(body: Partial<UserDocument>, res: Response) {
        try {
            const user = await this.dbRepoService.create(body)
            res.json({message : 'User created successfully'})
        } catch (error) {
            if (error.errorResponse.code === 11000) {
                throw new UnauthorizedException('Email is already registered')
            } else {
                throw new InternalServerErrorException(error)
            }
        }
    }
    async login(body: Partial<UserDocument>, res: Response) {
        try {
            const user = await this.dbRepoService.findOne({ email: body.email })
            if (!user) {
                throw new BadRequestException()
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