import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema({timestamps : true, toJSON : {virtuals : true}, toObject : {virtuals : true}})
export class Brand {

    @Prop()
    name : string

    @Prop({
        type : Object
    })
    logo : {
        url: String,
        public_id: String,
    }
    @Prop({
        ref : 'User',
        required : true
    })
    addedBy : Types.ObjectId

    @Prop({
        ref : 'Category',
        required : true
    })
    category : Types.ObjectId

    @Prop({
        ref : 'SubCategory',
        required : true
    })
    subCategory : Types.ObjectId
    
}
const brandSchema = SchemaFactory.createForClass(Brand)
export const brandModel = MongooseModule.forFeature([{name : Brand.name, schema : brandSchema}])
export type BrandDocument = HydratedDocument<Brand>