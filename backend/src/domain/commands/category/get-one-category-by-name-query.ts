import { Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { RepositoryError } from "src/domain/errors/repository_error";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { IGetOneQuery } from "../base/get-one-query";
import { CategoryName } from "src/domain/values/category-name";

@Injectable()
export class GetCategoryByNameQuery implements IGetOneQuery<Category, CategoryName> {
  constructor(private readonly categoryRepository: ICategoryRepository) { }

  async execute(name: CategoryName): Promise<Category | null | RepositoryError> {
    const result = await this.categoryRepository.getAll();
    const categories = result as Category[];
    return categories.find((category: Category) => category.name.isEqual(name)) || null;
  }
}
