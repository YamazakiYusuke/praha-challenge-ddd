import { GetPairByNameQuery } from 'src/domain/commands/pair/get-pair-by-name-query';
import { Pair } from 'src/domain/entities/pair';
import { IPairRepository } from 'src/domain/repositories/pair-repository';
import { ParticipantId, TeamId } from 'src/domain/values/id';
import { PairName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetPairByNameQuery UnitTest \n', () => {
  let query: GetPairByNameQuery;
  let pairRepository: IPairRepository;

  beforeEach(() => {
    pairRepository = mock<IPairRepository>();
    query = new GetPairByNameQuery(instance(pairRepository));
  });

  it('- should get pair by name \n', async () => {
    // 準備
    const pairName = PairName.create('Test Pair');
    const pair = Pair.create({ teamId: TeamId.create(), name: pairName, participantIds: [ParticipantId.create(), ParticipantId.create()] });

    when(pairRepository.getAll()).thenResolve([pair]);

    // 実行
    const result = await query.execute(pairName);

    // 確認
    expect(result).toEqual(pair);
    verify(pairRepository.getAll()).once();
  });
});
