import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Product {

    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    slug: string

    @Prop({
        type: Object
    })
    image: {
        url: String,
        public_id: String,
    }
    @Prop({
        type: [Object]
    })
    images: [{
        url: String,
        public_id: String,
    }]

    @Prop()
    price: number

    @Prop()
    discount: number

    @Prop()
    rateNum: string
    @Prop()
    rateAvg: number
    @Prop()
    quantity: number
    @Prop()
    stock: number

    @Prop({
        ref: 'Category',
        required: true
    })
    category: Types.ObjectId

    @Prop({
        ref: 'SubCategory',
        required: true
    })
    subCategory: Types.ObjectId

    @Prop({
        ref: 'Brand',
        required: true
    })
    brand: Types.ObjectId

    @Prop({
        ref: 'User',
        required: true
    })
    addedBy: Types.ObjectId
}
const productSchema = SchemaFactory.createForClass(Product)
export const productModel = MongooseModule.forFeature([{ name: Product.name, schema: productSchema }])
export type ProductDocument = HydratedDocument<Product>