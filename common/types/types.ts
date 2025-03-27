import { Request } from "express"
import { Types } from "mongoose"


export enum roleEnum {
    admin = 'admin',
    user = 'user'
}
export interface GuardReq extends Request {
    user : {
        email : string
        _id : Types.ObjectId
        iat : Date
        exp : Date
    }
}
