import { Body, Controller, HttpCode, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './DTO/authDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('signup')
    @HttpCode(201)
    signup(@Body() body : SignupDto, @Res() res : Response){
        return this.authService.signup(body, res)
    }

    @Post('login')
    login(@Body() body : LoginDto, @Res() res : Response){
        return this.authService.login(body, res)
    }
}
