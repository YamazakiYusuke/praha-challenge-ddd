import { Category } from "../../entities/category";
import { GetOneCategoryQuery } from "src/domain/commands/category/get-one-category-query";
import { Injectable } from "@nestjs/common";
import { Name } from "src/domain/values/name";
import { EntityError } from "src/domain/errors/entity_error";

@Injectable()
export class CategoryChangeNameService {
  constructor(private readonly getOneCategoryQuery: GetOneCategoryQuery) { }

  async execute(category: Category, newName: Name): Promise<void | Error> {
    const existingCategory = await this.getOneCategoryQuery.execute(newName);
    if (existingCategory != null) {
      throw new EntityError('このカテゴリー名は既に存在しています');
    }
    category.changeName(newName);
  }
}
