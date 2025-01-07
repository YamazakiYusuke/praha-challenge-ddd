import { Category } from "../entities/category";

export interface ICategoryRepository {
  save(category: Category, transaction?: any): Promise<void>
  getAll(): Promise<Category[]>
}
