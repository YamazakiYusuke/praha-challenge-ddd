import { Category } from "../entities/category";

export interface ICategoryRepository {
  save(category: Category): Promise<Category>
  getAll(): Promise<Category[]>
}
