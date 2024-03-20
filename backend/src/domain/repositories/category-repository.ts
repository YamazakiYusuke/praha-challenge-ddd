import { Prisma } from "@prisma/client";
import { Category } from "../entities/category";

export interface ICategoryRepository {
  save(category: Category, tx?: Prisma.TransactionClient): Promise<void | Error>
  getAll(): Promise<Category[] | Error>
}
