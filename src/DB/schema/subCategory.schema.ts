import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class SubCategory {
  @Prop()
  name: string;

  @Prop()
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

  @Prop({
    ref: 'Category',
    required: true,
  })
  category: Types.ObjectId;

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
const subCategorySchema = SchemaFactory.createForClass(SubCategory);
export const subCategoryModel = MongooseModule.forFeature([
  { name: SubCategory.name, schema: subCategorySchema },
]);
export type SubCategoryDocument = HydratedDocument<SubCategory>;
