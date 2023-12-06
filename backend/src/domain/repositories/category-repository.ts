import { Category } from "../entities/category";
import { Name } from "../values/name";

export interface ICategoryRepository {
  save(category: Category): Promise<Category | RepositoryError>
  get(name: string): Promise<Category | null | RepositoryError>
  getAll(): Promise<Category[] | RepositoryError>
}
