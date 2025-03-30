import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Cart {

    @Prop({
        ref: 'Product',
        required: true
    })
    products: [
        { product: Types.ObjectId, quantity: number }
    ]

    @Prop()
    totalPrice: number

    @Prop({
        ref: 'User',
        required: true
    })
    createdBy: Types.ObjectId
}
const cartSchema = SchemaFactory.createForClass(Cart)
export const cartModel = MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }])
export type CartDocument = HydratedDocument<Cart>