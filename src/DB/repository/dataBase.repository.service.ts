import { DeleteResult, FilterQuery, Model, Types, UpdateQuery } from "mongoose";


export abstract class DataBaseRepository<T> {
    constructor(private readonly model: Model<T>) { }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data)
    }

    async findOne(query: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(query)
    }

    async findAll(query: FilterQuery<T>): Promise<T | never[]> {
        return await this.model.find(query)
    }

    async findById(id: Types.ObjectId): Promise<T | null> {
        return await this.model.findById(id)
    }

    async deleteOne(query: FilterQuery<T>): Promise<DeleteResult> {
        return await this.model.deleteOne(query)
    }

    async deleteMany(query: FilterQuery<T>): Promise<DeleteResult> {
        return await this.model.deleteMany(query)
    }

    async findOneAndUpdate(query: FilterQuery<T>, data: Partial<T>): Promise<T | null> {
        return await this.model.findOneAndUpdate(query, data, { new: true })
    }
    
    async updateOne(query : FilterQuery<T>, data:  Partial<T>){
        return await this.model.updateOne(query, data)
    }
}