import { Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { RepositoryError } from "src/domain/errors/repository_error";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { Name } from "src/domain/values/name";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetCategoryByNameQuery implements IGetOneQuery<Category, Name> {
  constructor(private readonly categoryRepository: ICategoryRepository) { }

  async execute(name: Name): Promise<Category | null | RepositoryError> {
    const result = await this.categoryRepository.getAll();
    const categories = result as Category[];
    return categories.find((category: Category) => category.name.isEqual(name)) || null;
  }
}
