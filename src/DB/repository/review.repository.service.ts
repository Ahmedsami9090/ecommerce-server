import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./dataBase.repository.service";
import { Review, ReviewDocument } from "../schema/review.schema";

@Injectable()
export class ReviewRepoService extends DataBaseRepository<ReviewDocument>{
    constructor(@InjectModel(Review.name) private _model : Model<ReviewDocument>){
        super(_model)
    }

}