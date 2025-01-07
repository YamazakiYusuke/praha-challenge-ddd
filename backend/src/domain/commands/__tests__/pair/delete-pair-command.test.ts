import { DeletePairCommand } from 'src/domain/commands/pair/delete-pair-command';
import { Pair } from 'src/domain/entities/pair';
import { IPairRepository } from 'src/domain/repositories/pair-repository';
import { ParticipantId, TeamId } from 'src/domain/values/ids';
import { PairName } from 'src/domain/values/name';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# DeletePairCommand UnitTest \n', () => {
  let command: DeletePairCommand;
  let pairRepository: IPairRepository;

  beforeEach(() => {
    pairRepository = mock<IPairRepository>();
    command = new DeletePairCommand(instance(pairRepository));
  });

  it('- should save pair \n', async () => {
    // 準備
    const pair = Pair.create({ teamId: TeamId.create(), name: PairName.create('Pair 1'), participantIds: [ParticipantId.create(), ParticipantId.create()] });
    const transaction = {};

    when(pairRepository.save(anything(), anything())).thenResolve();

    // 実行
    await command.execute(pair, transaction);

    // 確認
    verify(pairRepository.delete(pair, transaction)).once();
  });
});
