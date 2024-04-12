import { GetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { SaveCategoryCommand } from "src/domain/commands/category/save-category-command";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { CategoryName } from "src/domain/values/name";
import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/category";

@injectable()
export class ChangeCategoryNameService {
  constructor(
    @inject(GetCategoryByNameQuery)
    private readonly getCategoryByNameQuery: GetCategoryByNameQuery,
    @inject(SaveCategoryCommand)
    private readonly saveCategoryCommand: SaveCategoryCommand,
  ) { }

  async execute(category: Category, newName: CategoryName): Promise<void> {
    const existingCategory = await this.getCategoryByNameQuery.execute(newName);
    if (existingCategory != null) {
      throw new DomainServiceError('このカテゴリー名は既に存在しています');
    }
    category.changeName(newName);
    await this.saveCategoryCommand.execute(category);
  }
}
