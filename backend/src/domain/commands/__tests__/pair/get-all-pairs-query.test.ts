import { GetAllPairsQuery } from 'src/domain/commands/pair/get-all-pairs-query';
import { Pair } from 'src/domain/entities/pair';
import { IPairRepository } from 'src/domain/repositories/pair-repository';
import { ParticipantId, TeamId } from 'src/domain/values/ids';
import { PairName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetAllPairsQuery UnitTest \n', () => {
  let query: GetAllPairsQuery;
  let pairRepository: IPairRepository;

  beforeEach(() => {
    pairRepository = mock<IPairRepository>();
    query = new GetAllPairsQuery(instance(pairRepository));
  });

  it('- should get all pairs \n', async () => {
    // 準備
    const pair1 = Pair.create({ teamId: TeamId.create(), name: PairName.create('Pair 1'), participantIds: [ParticipantId.create(), ParticipantId.create()] });
    const pair2 = Pair.create({ teamId: TeamId.create(), name: PairName.create('Pair 2'), participantIds: [ParticipantId.create(), ParticipantId.create()] });
    const pairs: Pair[] = [pair1, pair2];

    when(pairRepository.getAll()).thenResolve(pairs);

    // 実行
    const result = await query.execute();

    // 確認
    expect(result).toEqual(pairs);
    verify(pairRepository.getAll()).once();
  });
});
