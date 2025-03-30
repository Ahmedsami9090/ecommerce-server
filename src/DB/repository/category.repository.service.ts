import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./dataBase.repository.service";
import { Category, CategoryDocument } from "../schema/category.schema";

@Injectable()
export class CategoryRepoService extends DataBaseRepository<CategoryDocument>{
    constructor(@InjectModel(Category.name) private _model : Model<CategoryDocument>){
        super(_model)
    }

}