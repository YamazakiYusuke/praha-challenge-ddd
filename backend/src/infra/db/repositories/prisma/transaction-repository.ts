import { Prisma, PrismaClient } from '@prisma/client';
import { ITransactionRepository } from "src/domain/repositories/transaction-repository";

export class PrismaTransactionRepository implements ITransactionRepository {
  private readonly prisma = new PrismaClient();
  async execute(callback: (transaction: Prisma.TransactionClient) => Promise<void>): Promise<void> {
    await this.prisma.$transaction(async (transaction) => {
      // 外部キー制約を無効にする
      await transaction.$executeRaw`SET session_replication_role = replica;`;
      try {
        return await callback(transaction);
      } finally {
        // 外部キー制約を有効に戻す
        await transaction.$executeRaw`SET session_replication_role = DEFAULT;`;
      }
    });
  }
}
