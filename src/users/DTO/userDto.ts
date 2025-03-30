import { IsEmail, IsNotEmpty, Length } from "class-validator";


export class ConfirmEmailDto {

    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    @Length(6)
    otp : string
}