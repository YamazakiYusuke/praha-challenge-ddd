import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetAllQuery } from "../base/get-all-query";


export class GetAllCategoryQuery implements IGetAllQuery<Category[]> {
  constructor(private categoryRepository: ICategoryRepository) { }

  async execute(): Promise<Category[] | RepositoryError> {
    return await this.categoryRepository.getAll();
  }
}
