export interface ITransactionRepository {
  execute(callback: () => Promise<void>): Promise<void | Error>;
}
