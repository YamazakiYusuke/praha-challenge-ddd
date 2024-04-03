import { GetPairWithFewestMembersQuery } from 'src/domain/commands/pair/get-pair-with-fewest-members-query';
import { Pair } from 'src/domain/entities/pair';
import { IPairRepository } from 'src/domain/repositories/pair-repository';
import { ParticipantId, TeamId } from 'src/domain/values/id';
import { PairName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetPairWithFewestMembersQuery UnitTest \n', () => {
  let query: GetPairWithFewestMembersQuery;
  let pairRepository: IPairRepository;

  beforeEach(() => {
    pairRepository = mock<IPairRepository>();
    query = new GetPairWithFewestMembersQuery(instance(pairRepository));
  });

  it('- should get pair with fewest members \n', async () => {
    // 準備
    const pair1 = Pair.create({ teamId: TeamId.create(), name: PairName.create('Pair 1'), participantIds: [ParticipantId.create(), ParticipantId.create()] });
    const pair2 = Pair.create({ teamId: TeamId.create(), name: PairName.create('Pair 2'), participantIds: [ParticipantId.create(), ParticipantId.create(), ParticipantId.create()] });

    when(pairRepository.getAll()).thenResolve([pair1, pair2]);

    // 実行
    const result = await query.execute();

    // 確認
    expect(result).toEqual(pair1);
    verify(pairRepository.getAll()).once();
  });

  it('- should get null when pairRepository.getAll returns empty array \n', async () => {
    // 準備
    when(pairRepository.getAll()).thenResolve([]);

    // 実行
    const result = await query.execute();

    // 確認
    expect(result).toBeNull;
    verify(pairRepository.getAll()).once();
  });
});
