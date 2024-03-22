import { Prisma, PrismaClient } from '@prisma/client';
import { ITransactionRepository } from "src/domain/repositories/transaction-repository";

export class PrismaTransactionRepository implements ITransactionRepository {
  private readonly prisma = new PrismaClient();
  async execute(callback: (transaction: Prisma.TransactionClient) => Promise<void>): Promise<void | Error> {
    await this.prisma.$transaction(async (transaction) => {
      return await callback(transaction);
    });
  }
}
