import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Category {
  @Prop({ unique: true })
  name: string;

  @Prop({ unique: true })
  slug: string;

  @Prop({
    type: Object,
  })
  image: {
    secure_url: string;
    public_id: string;
  };
  @Prop({
    ref: 'User',
    required: true,
  })
  addedBy: Types.ObjectId;

  @Prop()
  isDeleted: boolean;

  @Prop({
    ref: 'User',
  })
  deletedBy: Types.ObjectId;

  @Prop({
    ref: 'User',
  })
  modifiedBy: Types.ObjectId;
}
const categorySchema = SchemaFactory.createForClass(Category);
export const categoryModel = MongooseModule.forFeature([
  { name: Category.name, schema: categorySchema },
]);
export type CategoryDocument = HydratedDocument<Category>;
