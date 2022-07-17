import { FilterQuery, UpdateQuery, QueryOptions, Model } from "mongoose";
import { innerResponse } from "../utils/enum.util";

export class BaseService {
  public async save<T>(model: T, opts: {}): Promise<T> {
    return await (model as any).save(opts);
  }

  public async findOne<T>(
    model: Model<T>,
    params: FilterQuery<T>,
    options: QueryOptions = {},
    select: string | object = ""
  ): Promise<T> {
    return await model.findOne(params, options).select(select);
  }

  public async findAll<T>(
    model: Model<T>,
    params: FilterQuery<T>,
    options: QueryOptions = {}
  ): Promise<T[]> {
    return await model.find(params, options);
  }

  public async updateOne<T>(
    model: Model<T>,
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true }
  ) {
    return await model.findOneAndUpdate(query, update, options);
  }

  public async deleteOne<T>(model: Model<T>, params: FilterQuery<T>) {
    return await model.findOneAndDelete(params);
  }
}
