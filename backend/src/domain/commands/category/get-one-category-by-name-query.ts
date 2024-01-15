import { Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { CategoryName } from "src/domain/values/name";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetCategoryByNameQuery implements IGetQuery<Category, CategoryName> {
  constructor(private readonly categoryRepository: ICategoryRepository) { }

  async execute(name: CategoryName): Promise<Category | null | Error> {
    const result = await this.categoryRepository.getAll();
    const categories = result as Category[];
    return categories.find((category: Category) => category.name.isEqual(name)) || null;
  }
}
