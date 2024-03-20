import { ITransactionRepository } from "src/domain/repositories/transaction-repository";

export class InMemoryTeamRepository implements ITransactionRepository {
  async execute(callback: () => Promise<void>): Promise<void | Error> {
    await callback();
  }
}
