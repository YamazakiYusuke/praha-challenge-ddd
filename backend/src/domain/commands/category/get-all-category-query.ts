import { Injectable } from "@nestjs/common";
import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { IGetAllQuery } from "../base/get-all-query";

@Injectable()
export class GetAllCategoryQuery implements IGetAllQuery<Category[]> {
  constructor(private readonly categoryRepository: ICategoryRepository) { }

  async execute(): Promise<Category[] | Error> {
    return await this.categoryRepository.getAll();
  }
}
