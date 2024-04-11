import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { inject, injectable } from "tsyringe";
import { ICommand } from "../base/command";

@injectable()
export class SaveCategoryCommand implements ICommand<Category> {
  constructor(
    @inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) { }

  async execute(category: Category, transaction?: any): Promise<void> {
    await this.categoryRepository.save(category, transaction);
  }
}
