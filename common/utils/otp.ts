import { customAlphabet } from "nanoid";
import { verifyHash } from "./hash";
import { UserDocument } from "src/DB/schema/user.schema";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class Otp {
    
    create(){
        const createOtp = customAlphabet('0123456789', 6)
        const otp = createOtp()
        const otpExpire = new Date(Date.now() + 15 * 60 * 1000) // 10 min
        return {otp, otpExpire}
    }

    verify(user : UserDocument, otp){
        if(user.otpExpireAt < new Date()){
            throw new UnauthorizedException('OTP expired.')
        }
        const result = verifyHash(otp, user.otp)
        return result
    }
}