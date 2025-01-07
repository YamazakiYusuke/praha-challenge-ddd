import { ITransactionRepository } from "src/domain/repositories/transaction-repository";

export class InMemoryTeamRepository implements ITransactionRepository {
  async execute(callback: (tx: string) => Promise<void>): Promise<void> {
    await callback('');
  }
}
