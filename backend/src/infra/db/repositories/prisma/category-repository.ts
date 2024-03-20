import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";

export class PrismaCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  async save(category: Category): Promise<void | Error> {
    this.categories.push(category);
    return;
  }

  async getAll(): Promise<Category[] | Error> {
    return this.categories;
  }
}
