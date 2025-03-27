import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { roleEnum } from "common/types/types";
import { createHash } from "common/utils/hash";
import { HydratedDocument } from "mongoose";



@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class User {
    @Prop({
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 10
    })
    fname: string

    @Prop({
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 10
    })
    lname: string

    @Prop({
        unique: true,
        required: true,
        trim: true,
    })
    email: string

    @Prop({
        required: true
    })
    password: string

    @Prop({
        enum: roleEnum,
        default: roleEnum.user
    })
    role: string

    @Prop({
        default: false
    })
    confirmed: boolean

    @Prop()
    otp: string

    @Prop()
    otpExpireAt: Date

    @Prop({type : Object})
    profilePic: {
        url: String,
        public_id: String,
    }

    @Prop({type : Object})
    coverPic: {
        url: String,
        public_id: String,
    }

    @Virtual({
        get: function (this: User) {
            return `${this.fname} ${this.lname}`
        }
    })
    fullName: string
}
const userSchema = SchemaFactory.createForClass(User)

userSchema.pre('save', function (next) {
    if (this.isDirectModified('password')) {
        this.password = createHash(this.password)
    }
    next()
})
export const userModel = MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
export type UserDocument = HydratedDocument<User>