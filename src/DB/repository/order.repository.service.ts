import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./dataBase.repository.service";
import { Order, OrderDocument } from "../schema/order.schema";

@Injectable()
export class OrderRepoService extends DataBaseRepository<OrderDocument>{
    constructor(@InjectModel(Order.name) private _model : Model<OrderDocument>){
        super(_model)
    }

}