import { Category } from "../entities/category";

export interface ICategoryRepository {
  save(category: Category): Promise<Category | RepositoryError>
  getAll(): Promise<Category[] | RepositoryError>
}
