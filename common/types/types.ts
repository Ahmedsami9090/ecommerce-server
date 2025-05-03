import { Request } from 'express';
import { Types } from 'mongoose';
import { User, UserDocument } from 'src/DB/schema/user.schema';

export enum RoleEnum {
  super = 'super',
  admin = 'admin',
  user = 'user'
}

export enum otpTypes {
  activateAccount = 'activateAccount',
  resetPassword = 'resetPassword'
}

export enum OrderStatusEnum {
  placed = 'placed',
  paymentReceived = 'paymentReceived',
  confirmed = 'confirmed',
}

export enum PaymentMethodEnum {
  cash = 'cash',
  visa = 'visa',
}

export enum GenderEnum {
  male = 'male',
  female = 'female',
}
export interface JwtPayload {
  email: string;
  _id: Types.ObjectId;
  iat: Date;
  exp: Date;
}
export interface AuthenticationGuardReq extends Request {
  user: UserDocument
}
export interface IsRegisteredGuardReq extends Request {
  user: UserDocument;
}
