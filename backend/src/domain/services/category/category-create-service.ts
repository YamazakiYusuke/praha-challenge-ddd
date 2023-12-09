import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { Category, CategoryProps } from "../../entities/category";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { GetOneCategoryQuery } from "src/domain/commands/category/get-one-category-query";

export class CategoryCreateService {
  constructor(private readonly repo: ICategoryRepository) { }

  async execute(props: CategoryProps): Promise<Category | EntityCreationError | RepositoryError> {
    const getOneCategoryQuery = new GetOneCategoryQuery(props.name, this.repo);
    const existingCategory = await getOneCategoryQuery.execute();
    if (existingCategory instanceof RepositoryError) {
      throw existingCategory;
    }
    if (existingCategory != null) {
      throw new EntityCreationError('このカテゴリー名は既に存在しています');
    }
    const newCategory = Category.create(props);
    return newCategory;
  }
}
