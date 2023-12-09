import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveCategoryCommand implements ICommand {
  constructor(private category: Category, private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<void | RepositoryError> {
    await this.categoryRepository.save(this.category);
  }
}
