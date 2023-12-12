import { Category } from "../entities/category";
import { RepositoryError } from "../errors/repository_error";
import { Name } from "../values/name";

export interface ICategoryRepository {
  save(category: Category): Promise<void | RepositoryError>
  getAll(): Promise<Category[] | RepositoryError>
}
