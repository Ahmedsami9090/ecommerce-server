import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Review {

    @Prop({
        ref: 'Product',
        required: true
    })
    product: Types.ObjectId

    @Prop()
    rate: number

    @Prop()
    comment: string

    @Prop({
        ref: 'Order',
        required: true
    })
    order: Types.ObjectId

    @Prop({
        ref: 'User',
        required: true
    })
    addedBy: Types.ObjectId
}
const reviewSchema = SchemaFactory.createForClass(Review)
export const ReviewModel = MongooseModule.forFeature([{ name: Review.name, schema: reviewSchema }])
export type ReviewDocument = HydratedDocument<Review>