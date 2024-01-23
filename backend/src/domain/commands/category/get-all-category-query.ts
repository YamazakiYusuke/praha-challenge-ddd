import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { IGetQuery } from "../base/get-query";

export interface IGetAllCategoryQuery extends IGetQuery<Category[]> {
  execute(): Promise<Category[] | Error>;
}

@Injectable()
export class GetAllCategoryQuery implements IGetAllCategoryQuery {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) { }

  async execute(): Promise<Category[] | Error> {
    return await this.categoryRepository.getAll();
  }
}
