import { ITransactionRepository } from "src/domain/repositories/transaction-repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class Transaction {
  constructor(
    @inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) { }

  async execute(callback: (transaction: any) => Promise<void>): Promise<void> {
    await this.transactionRepository.execute(callback);
  }
}