import { Request } from "express"
import { Types } from "mongoose"
import { UserDocument } from "src/DB/schema/user.schema"


export enum RoleEnum {
    admin = 'admin',
    user = 'user'
}

export enum OrderStatusEnum {
    placed = 'placed',
    paymentReceived = 'paymentReceived',
    confirmed = 'confirmed'
}

export enum PaymentMethodEnum {
    cash = 'cash',
    visa = 'visa'
}

export enum GenderEnum {
    male = 'male',
    female = 'female'
}
export interface AuthGuardReq extends Request {
    user : {
        email : string
        _id : Types.ObjectId
        iat : Date
        exp : Date
    }
}
export interface IsRegisteredGuardReq extends Request {
    user : UserDocument
}