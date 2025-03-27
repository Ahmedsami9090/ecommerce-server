import { IsAlpha, IsEmail, isNotEmpty, IsNotEmpty, IsStrongPassword, MaxLength, MinLength} from "class-validator";
import { IsPasswordMatch } from "common/decorators/IsPasswordPatch.decorator";

export class SignupDto {

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(10)
    @IsAlpha()
    fname : string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(10)
    @IsAlpha()
    lname : string

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsStrongPassword()
    @IsNotEmpty()
    password : string

    @IsNotEmpty()
    @IsPasswordMatch()
    cPassword : string
}

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsNotEmpty()
    password : string
}