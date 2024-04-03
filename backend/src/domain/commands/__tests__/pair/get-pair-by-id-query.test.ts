import { GetPairByIdQuery } from 'src/domain/commands/pair/get-pair-by-id-query';
import { Pair } from 'src/domain/entities/pair';
import { IPairRepository } from 'src/domain/repositories/pair-repository';
import { PairId, ParticipantId, TeamId } from 'src/domain/values/id';
import { PairName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetPairByIdQuery UnitTest \n', () => {
  let query: GetPairByIdQuery;
  let pairRepository: IPairRepository;

  beforeEach(() => {
    pairRepository = mock<IPairRepository>();
    query = new GetPairByIdQuery(instance(pairRepository));
  });

  it('- should get pair by id \n', async () => {
    // 準備
    const pairId = PairId.create();
    const pair = Pair.restore(pairId, { teamId: TeamId.create(), name: PairName.create('Pair 1'), participantIds: [ParticipantId.create(), ParticipantId.create()] });

    when(pairRepository.getAll()).thenResolve([pair]);

    // 実行
    const result = await query.execute(pairId);

    // 確認
    expect(result).toEqual(pair);
    verify(pairRepository.getAll()).once();
  });
});
