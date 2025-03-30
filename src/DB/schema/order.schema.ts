import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderStatusEnum, PaymentMethodEnum } from "common/types/types";
import { HydratedDocument, Types } from "mongoose";


@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Order {

    @Prop({
        ref: 'User',
        required: true
    })
    orderedBy: Types.ObjectId

    @Prop({
        ref: 'Product',
        required: true
    })
    products: [
        { product: Types.ObjectId, quantity: number }
    ]

    @Prop({
        ref: "Coupon",
        required: true
    })
    coupon: Types.ObjectId

    @Prop()
    totalPrice: number

    @Prop({
        enum: OrderStatusEnum,
        default: OrderStatusEnum.placed
    })
    status: string

    @Prop({
        ref: 'User'
    })
    cancelledBy: Types.ObjectId

    @Prop({
        enum: PaymentMethodEnum,
        required: true
    })
    paymentMethod: string

    @Prop()
    cancelReason: string
}
const orderSchema = SchemaFactory.createForClass(Order)
export const orderModel = MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }])
export type OrderDocument = HydratedDocument<Order>