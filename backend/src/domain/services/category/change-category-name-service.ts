import { GetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { SaveCategoryCommand } from "src/domain/commands/category/save-category-command";
import { EntityError } from "src/domain/errors/entity_error";
import { CategoryName } from "src/domain/values/name";
import { container } from "tsyringe";
import { Category } from "../../entities/category";

export class ChangeCategoryNameService {
  constructor(
    private readonly getCategoryByNameQuery: GetCategoryByNameQuery = container.resolve(GetCategoryByNameQuery),
    private readonly saveCategoryCommand: SaveCategoryCommand = container.resolve(SaveCategoryCommand),
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
