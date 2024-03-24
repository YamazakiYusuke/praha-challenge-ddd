import { Inject, Injectable } from "@nestjs/common";
import { GetCategoryByNameQuery, IGetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { ISaveCategoryCommand, SaveCategoryCommand } from "src/domain/commands/category/save-category-command";
import { EntityError } from "src/domain/errors/entity_error";
import { CategoryName } from "src/domain/values/name";
import { Category } from "../../entities/category";

export interface IChangeCategoryNameService {
  execute(category: Category, newName: CategoryName): Promise<void>;
}

@Injectable()
export class ChangeCategoryNameService implements IChangeCategoryNameService {
  constructor(
    @Inject(GetCategoryByNameQuery)
    private readonly getCategoryByNameQuery: IGetCategoryByNameQuery,
    @Inject(SaveCategoryCommand)
    private readonly saveCategoryCommand: ISaveCategoryCommand,
  ) { }

  async execute(category: Category, newName: CategoryName): Promise<void> {
    const existingCategory = await this.getCategoryByNameQuery.execute(newName);
    if (existingCategory != null) {
      throw new EntityError('このカテゴリー名は既に存在しています');
    }
    category.changeName(newName);
    await this.saveCategoryCommand.execute(category);
  }
}
