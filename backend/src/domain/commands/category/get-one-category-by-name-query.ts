import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { CategoryName } from "src/domain/values/name";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetCategoryByNameQuery implements IGetQuery<Category, CategoryName> {
  constructor(
    @inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) { }

  async execute(name: CategoryName): Promise<Category | null> {
    const categories = await this.categoryRepository.getAll();
    return categories.find((category: Category) => category.name.isEqual(name)) || null;
  }
}
