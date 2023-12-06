import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { Category, CategoryProps } from "../../entities/category";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { RepositoryError } from "../../errors/repository_error";
import { EntityStateModificationError } from "../../errors/entity_state_modification_error";

export class CategoryCreateService {
  constructor(private readonly repo: ICategoryRepository) { }

  async createCategory(props: CategoryProps): Promise<Category | EntityCreationError | RepositoryError> {
    const existingCategory = await this.repo.get(props.name);
    if (existingCategory instanceof RepositoryError) {
      throw existingCategory;
    }
    if (existingCategory != null) {
      throw new EntityCreationError('このカテゴリー名は既に存在しています');
    }
    const newCategory = Category.create(props);
    return newCategory;
  }

  async changeCategoryName(category: Category, newName: string): Promise<Category | EntityStateModificationError | RepositoryError> {
    const existingCategory = await this.repo.get(newName);
    if (existingCategory instanceof RepositoryError) {
      throw existingCategory;
    }
    if (existingCategory == null) {
      throw new EntityStateModificationError('このカテゴリー名は既に存在しています');
    }
    return category.changeName(newName);
  }
}
