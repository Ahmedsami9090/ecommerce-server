import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from "class-validator";
import { Types } from "mongoose";


export class ConfirmEmailDto {

    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    @Length(6)
    otp : string
}

export class ForgotPasswordDto {

    @IsNotEmpty()
    @IsEmail()
    email : string

}

export class ResetPasswordDto {
    
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    @Length(6)
    otp : string

    @IsStrongPassword()
    @IsNotEmpty()
    newPassword: string
}

export class freezeAccountDto {
    @IsNotEmpty()
    userId : Types.ObjectId
}