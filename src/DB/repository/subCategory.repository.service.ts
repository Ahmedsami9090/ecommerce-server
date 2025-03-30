import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./dataBase.repository.service";
import { SubCategory, SubCategoryDocument } from "../schema/subCategory.schema";

@Injectable()
export class SubCategoryRepoService extends DataBaseRepository<SubCategoryDocument>{
    constructor(@InjectModel(SubCategory.name) private _model : Model<SubCategoryDocument>){
        super(_model)
    }

}