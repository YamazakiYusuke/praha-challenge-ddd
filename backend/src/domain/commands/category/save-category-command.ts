import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveCategoryCommand implements ICommand<Category> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(category: Category): Promise<void | RepositoryError> {
    await this.categoryRepository.save(category);
  }
}
