export interface ITransactionRepository {
  execute(callback: (transaction: any) => Promise<void>): Promise<void>;
}
