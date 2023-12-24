import { Injectable } from "@nestjs/common";
import { GetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { EntityError } from "src/domain/errors/entity_error";
import { Category } from "../../entities/category";
import { CategoryName } from "src/domain/values/category-name";

@Injectable()
export class CategoryChangeNameService {
  constructor(private readonly getCategoryByNameQuery: GetCategoryByNameQuery) { }

  async execute(category: Category, newName: CategoryName): Promise<void | Error> {
    const existingCategory = await this.getCategoryByNameQuery.execute(newName);
    if (existingCategory != null) {
      throw new EntityError('このカテゴリー名は既に存在しています');
    }
    category.changeName(newName);
  }
}
