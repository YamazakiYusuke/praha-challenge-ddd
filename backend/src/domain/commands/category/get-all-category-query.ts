import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetAllCategoryQuery implements IGetQuery<Category[]> {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) { }

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }
}
