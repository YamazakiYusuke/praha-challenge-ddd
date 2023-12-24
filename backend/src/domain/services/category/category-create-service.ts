import { Injectable } from "@nestjs/common";
import { GetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { Category, CategoryProps } from "../../entities/category";
import { EntityError } from "../../errors/entity_error";

@Injectable()
export class CategoryCreateService {
  constructor(private readonly getOneCategoryQuery: GetCategoryByNameQuery) { }

  async execute(props: CategoryProps): Promise<Category | Error> {
    const existingCategory = await this.getOneCategoryQuery.execute(props.name);
    if (existingCategory != null) {
      throw new EntityError('このカテゴリー名は既に存在しています');
    }
    return Category.create(props);
  }
}
