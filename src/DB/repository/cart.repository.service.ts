import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./dataBase.repository.service";
import { Category, CategoryDocument } from "../schema/category.schema";
import { Cart, CartDocument } from "../schema/cart.schema";

@Injectable()
export class CartRepoService extends DataBaseRepository<CartDocument>{
    constructor(@InjectModel(Cart.name) private _model : Model<CartDocument>){
        super(_model)
    }

}