import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./dataBase.repository.service";
import { Brand, BrandDocument } from "../schema/brand.schema";

@Injectable()
export class BrandRepoService extends DataBaseRepository<BrandDocument>{
    constructor(@InjectModel(Brand.name) private _model : Model<BrandDocument>){
        super(_model)
    }

}