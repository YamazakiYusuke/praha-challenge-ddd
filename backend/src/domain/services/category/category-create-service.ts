import { Inject, Injectable } from "@nestjs/common";
import { IGetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { ISaveCategoryCommand, SaveCategoryCommand } from "src/domain/commands/category/save-category-command";
import { Category, CategoryProps } from "../../entities/category";
import { EntityError } from "../../errors/entity_error";

export interface ICategoryCreateService {
  execute(props: CategoryProps): Promise<Category | Error>;
}

@Injectable()
export class CategoryCreateService implements ICategoryCreateService {
  constructor(
    @Inject('IGetCategoryByNameQuery')
    private readonly getCategoryByNameQuery: IGetCategoryByNameQuery,
    @Inject(SaveCategoryCommand)
    private readonly saveCategoryCommand: ISaveCategoryCommand,
  ) { }

  async execute(props: CategoryProps): Promise<Category | Error> {
    const existingCategory = await this.getCategoryByNameQuery.execute(props.name);
    if (existingCategory != null) {
      throw new EntityError('このカテゴリー名は既に存在しています');
    }
    const newCategory = Category.create(props) as Category;
    await this.saveCategoryCommand.execute(newCategory);
    return newCategory;
  }
}
