import { Inject, Injectable } from "@nestjs/common";
import { GetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { SaveCategoryCommand } from "src/domain/commands/category/save-category-command";
import { Category, CategoryProps } from "../../entities/category";
import { EntityError } from "../../errors/entity_error";
import { container } from "tsyringe";

export interface ICreateCategoryService {
  execute(props: CategoryProps): Promise<Category>;
}

export class CreateCategoryService implements ICreateCategoryService {
  constructor(
    private readonly getCategoryByNameQuery: GetCategoryByNameQuery = container.resolve(GetCategoryByNameQuery),
    private readonly saveCategoryCommand: SaveCategoryCommand = container.resolve(SaveCategoryCommand),
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
