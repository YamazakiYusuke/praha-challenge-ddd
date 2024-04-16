import { Transaction } from 'src/domain/commands/transaction/transaction';
import { ITransactionRepository } from 'src/domain/repositories/transaction-repository';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# Transaction UnitTest \n', () => {
  let transaction: Transaction;
  let transactionRepository: ITransactionRepository;

  beforeEach(() => {
    transactionRepository = mock<ITransactionRepository>();
    transaction = new Transaction(instance(transactionRepository));
  });

  it('- should execute transaction \n', async () => {
    // 準備
    const transactionCallback = async () => {};

    when(transactionRepository.execute(transactionCallback)).thenResolve();

    // 実行
    await transaction.execute(transactionCallback);

    // 確認
    verify(transactionRepository.execute(transactionCallback)).once();
  });
});
