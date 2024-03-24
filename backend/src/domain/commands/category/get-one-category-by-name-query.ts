import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { CategoryName } from "src/domain/values/name";
import { IGetQuery } from "../base/get-query";

export interface IGetCategoryByNameQuery extends IGetQuery<Category, CategoryName> {
  execute(name: CategoryName): Promise<Category | null>;
}

@Injectable()
export class GetCategoryByNameQuery implements IGetCategoryByNameQuery {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) { }

  async execute(name: CategoryName): Promise<Category | null> {
    const categories = await this.categoryRepository.getAll();
    return categories.find((category: Category) => category.name.isEqual(name)) || null;
  }
}
