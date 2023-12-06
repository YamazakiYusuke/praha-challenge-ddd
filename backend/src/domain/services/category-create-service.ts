import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { Category, CategoryProps } from "../entities/category";

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
