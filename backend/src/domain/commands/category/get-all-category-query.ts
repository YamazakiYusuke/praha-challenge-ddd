import { Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetAllCategoryQuery implements IGetQuery<Category[]> {
  constructor(private readonly categoryRepository: ICategoryRepository) { }

  async execute(): Promise<Category[] | Error> {
    return await this.categoryRepository.getAll();
  }
}
