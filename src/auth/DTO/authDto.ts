import { Type } from "class-transformer";
import { IsAlpha, IsDate, IsEmail, isNotEmpty, IsNotEmpty, IsStrongPassword, Length, MaxLength, MinLength } from "class-validator";
import { IsPasswordMatch } from "common/decorators/IsPasswordPatch.decorator";

export class SignupDto {

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(10)
    @IsAlpha()
    fname: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(10)
    @IsAlpha()
    lname: string

    @IsNotEmpty()
    @IsAlpha()
    gender: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @IsPasswordMatch()
    cPassword: string

    @IsNotEmpty()
    @Length(11, 11)
    phone: string

    @IsNotEmpty()
    address: string

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    DOB: Date

}

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}