import { Category } from "../entities/category";
import { RepositoryError } from "../errors/repository_error";

export interface ICategoryRepository {
  save(category: Category): Promise<Category | RepositoryError>
  get(name: string): Promise<Category | null | RepositoryError>
  getAll(): Promise<Category[] | RepositoryError>
}
