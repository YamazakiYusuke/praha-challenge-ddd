import { Category } from "../entities/category";

export interface ICategoryRepository {
  save(category: Category): Promise<void | Error>
  getAll(): Promise<Category[] | Error>
}
