import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";
import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./dataBase.repository.service";

@Injectable()
export class UserRepoService extends DataBaseRepository<UserDocument>{
    constructor(@InjectModel(User.name) private _model : Model<UserDocument>){
        super(_model)
    }

}