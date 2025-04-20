import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UploadApiOptions } from "cloudinary";
import { cloudinaryConfig } from "common/utils/cloudinaryConfig";

@Injectable()
export class CloudUpload {
    constructor(){}
    private _cloudinary = cloudinaryConfig()
    async uploadFile(file : Express.Multer.File, options : UploadApiOptions){
        if(!file){
            throw new UnauthorizedException('file must be provided')
        }
        return await this._cloudinary.uploader.upload(file.path, options)
    }

    async deleteFile(public_id : string){
        return await this._cloudinary.uploader.destroy(public_id)
    }
}