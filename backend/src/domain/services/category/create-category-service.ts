import { GetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { SaveCategoryCommand } from "src/domain/commands/category/save-category-command";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { inject, injectable } from "tsyringe";
import { Category, CategoryProps } from "../../entities/category";

@injectable()
export class CreateCategoryService {
  constructor(
    @inject(GetCategoryByNameQuery)
    private readonly getCategoryByNameQuery: GetCategoryByNameQuery,
    @inject(SaveCategoryCommand)
    private readonly saveCategoryCommand: SaveCategoryCommand,
  ) { }

  async execute(props: CategoryProps): Promise<Category> {
    const existingCategory = await this.getCategoryByNameQuery.execute(props.name);
    if (existingCategory != null) {
      throw new DomainServiceError('このカテゴリー名は既に存在しています');
    }
    const newCategory = Category.create(props) as Category;
    await this.saveCategoryCommand.execute(newCategory);
    return newCategory;
  }
}
