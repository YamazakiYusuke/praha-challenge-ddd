import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { Category, CategoryProps } from "../../entities/category";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { GetOneCategoryQuery } from "src/domain/commands/category/get-one-category-query";
import { Injectable } from "@nestjs/common";
import { EntityModificationError } from "src/domain/errors/entity_modification_error";
import { Name } from "src/domain/values/name";

@Injectable()
export class CategoryChangeNameService {
  constructor(private readonly getOneCategoryQuery: GetOneCategoryQuery) { }

  async execute(category: Category, newName: Name): Promise<Category | EntityModificationError | RepositoryError> {
    const existingCategory = await this.getOneCategoryQuery.execute(newName);
    if (existingCategory != null) {
      throw new EntityCreationError('このカテゴリー名は既に存在しています');
    }
    const modifiedCategory = category.changeName(newName);
    return modifiedCategory;
  }
}
