import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  async save(category: Category): Promise<void> {
    this.categories.push(category);
    return;
  }

  async getAll(): Promise<Category[]> {
    return this.categories;
  }
}
