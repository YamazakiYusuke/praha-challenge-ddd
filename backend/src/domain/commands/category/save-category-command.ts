import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { ICommand } from "../base/command";

export interface ISaveCategoryCommand extends ICommand<Category> {
  execute(category: Category, transaction?: any): Promise<void>;
}

@Injectable()
export class SaveCategoryCommand implements ISaveCategoryCommand {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) { }

  async execute(category: Category, transaction?: any): Promise<void> {
    await this.categoryRepository.save(category, transaction);
  }
}
