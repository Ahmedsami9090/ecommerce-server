import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema({timestamps : true, toJSON : {virtuals : true}, toObject : {virtuals : true}})
export class Category {

    @Prop()
    name : string

    @Prop()
    slug : string

    @Prop({
        type : Object
    })
    image : {
        url: String,
        public_id: String,
    }
    @Prop({
        ref : 'User',
        required : true
    })
    addedBy : Types.ObjectId
}
const categorySchema = SchemaFactory.createForClass(Category)
export const categoryModel = MongooseModule.forFeature([{name : Category.name, schema : categorySchema}])
export type CategoryDocument = HydratedDocument<Category>