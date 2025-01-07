import { Prisma, PrismaClient } from "@prisma/client";
import { Category } from "src/domain/entities/category";
import { ICategoryRepository } from "src/domain/repositories/category-repository";
import { CategoryId } from "src/domain/values/ids";
import { CategoryName } from "src/domain/values/name";

export class PrismaCategoryRepository implements ICategoryRepository {
  private readonly prisma = new PrismaClient();

  async save(category: Category, transaction?: Prisma.TransactionClient): Promise<void> {
    const prismaClient = transaction ?? this.prisma;

    await prismaClient.category.upsert({
      where: {
        id: category.id.value
      },
      update: {
        name: category.name.value
      },
      create: {
        id: category.id.value,
        name: category.name.value,
      },
    });
  }

  async getAll(): Promise<Category[]> {
    const categoriesData = await this.prisma.category.findMany();

    return categoriesData.map(data =>
      Category.restore(
        CategoryId.restore(data.id),
        { name: CategoryName.restore(data.name) }
      )
    );
  }
}
