import { Inject, Injectable } from "@nestjs/common";
import { ITransactionRepository } from "src/domain/repositories/transaction-repository";

@Injectable()
export class Transaction {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) { }

  async execute(callback: (transaction: any) => Promise<void>): Promise<void> {
    await this.transactionRepository.execute(callback);
  }
}