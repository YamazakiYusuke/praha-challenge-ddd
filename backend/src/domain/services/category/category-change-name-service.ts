import { Injectable, Inject } from "@nestjs/common";
import { GetCategoryByNameQuery, IGetCategoryByNameQuery } from "src/domain/commands/category/get-one-category-by-name-query";
import { EntityError } from "src/domain/errors/entity_error";
import { CategoryName } from "src/domain/values/name";
import { Category } from "../../entities/category";

export interface ICategoryChangeNameService {
  execute(category: Category, newName: CategoryName): Promise<void | Error>;
}

@Injectable()
export class CategoryChangeNameService implements ICategoryChangeNameService {
  constructor(
    @Inject(GetCategoryByNameQuery) 
    private readonly getCategoryByNameQuery: IGetCategoryByNameQuery
  ) { }

  async execute(category: Category, newName: CategoryName): Promise<void | Error> {
    const existingCategory = await this.getCategoryByNameQuery.execute(newName);
    if (existingCategory != null) {
      throw new EntityError('このカテゴリー名は既に存在しています');
    }
    category.changeName(newName);
  }
}
