import { GetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { SaveCategoryCommand } from "src/domain/commands/category/save-category-command";
import { container } from "tsyringe";
import { Category, CategoryProps } from "../../entities/category";
import { EntityError } from "../../errors/entity_error";
import { inject, injectable } from "tsyringe";

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
      throw new EntityError('このカテゴリー名は既に存在しています');
    }
    const newCategory = Category.create(props) as Category;
    await this.saveCategoryCommand.execute(newCategory);
    return newCategory;
  }
}
