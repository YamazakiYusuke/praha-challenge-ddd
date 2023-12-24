import { Injectable } from "@nestjs/common";
import { GetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { EntityError } from "src/domain/errors/entity_error";
import { Name } from "src/domain/values/name";
import { Category } from "../../entities/category";

@Injectable()
export class CategoryChangeNameService {
  constructor(private readonly getOneCategoryQuery: GetCategoryByNameQuery) { }

  async execute(category: Category, newName: Name): Promise<void | Error> {
    const existingCategory = await this.getOneCategoryQuery.execute(newName);
    if (existingCategory != null) {
      throw new EntityError('このカテゴリー名は既に存在しています');
    }
    category.changeName(newName);
  }
}
