import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./dataBase.repository.service";
import { Product, ProductDocument } from "../schema/product.schema";

@Injectable()
export class ProductRepoService extends DataBaseRepository<ProductDocument>{
    constructor(@InjectModel(Product.name) private _model : Model<ProductDocument>){
        super(_model)
    }

}