import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword, Length } from "class-validator";
import { otpTypes } from "common/types/types";
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

export class otpResendDto {
    
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    @IsEnum(otpTypes)
    otpFor : otpTypes
}