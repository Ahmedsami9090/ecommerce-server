import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Coupon {

    @Prop()
    amount: number

    @Prop()
    code: string

    @Prop()
    expireAt: Date


    @Prop({
        ref: 'User',
        required: true
    })
    addedBy: Types.ObjectId

    @Prop({
        ref: 'User',
        required: true
    })
    users: [Types.ObjectId]
}
const couponSchema = SchemaFactory.createForClass(Coupon)
export const couponModel = MongooseModule.forFeature([{ name: Coupon.name, schema: couponSchema }])
export type CouponDocument = HydratedDocument<Coupon>