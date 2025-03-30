import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./dataBase.repository.service";
import { Coupon, CouponDocument } from "../schema/coupon.schema";

@Injectable()
export class CouponRepoService extends DataBaseRepository<CouponDocument>{
    constructor(@InjectModel(Coupon.name) private _model : Model<CouponDocument>){
        super(_model)
    }

}