import { GetPairsByTeamIdQuery } from 'src/domain/commands/pair/get-pairs-by-team-id-query';
import { Pair } from 'src/domain/entities/pair';
import { IPairRepository } from 'src/domain/repositories/pair-repository';
import { ParticipantId, TeamId } from 'src/domain/values/ids';
import { PairName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetPairsByTeamIdQuery UnitTest \n', () => {
  let query: GetPairsByTeamIdQuery;
  let pairRepository: IPairRepository;

  beforeEach(() => {
    pairRepository = mock<IPairRepository>();
    query = new GetPairsByTeamIdQuery(instance(pairRepository));
  });

  it('- should get pairs by team id \n', async () => {
    // 準備
    const teamId = TeamId.create();
    const pair1 = Pair.create({ teamId: teamId, name: PairName.create('Pair 1'), participantIds: [ParticipantId.create(), ParticipantId.create()] });
    const pair2 = Pair.create({ teamId: teamId, name: PairName.create('Pair 2'), participantIds: [ParticipantId.create(), ParticipantId.create(), ParticipantId.create()] });

    when(pairRepository.getAll()).thenResolve([pair1, pair2]);

    // 実行
    const result = await query.execute(teamId);

    // 確認
    expect(result).toEqual([pair1, pair2]);
    verify(pairRepository.getAll()).once();
  });

  it('- should get empty array when pairRepository.getAll returns empty array \n', async () => {
    // 準備
    when(pairRepository.getAll()).thenResolve([]);

    // 実行
    const result = await query.execute(TeamId.create());

    // 確認
    expect(result).toEqual([]);
    verify(pairRepository.getAll()).once();
  });

  it('- should get empty array when pairRepository.getAll does not include pairs for the target teamId \n', async () => {
    // 準備
    const targetTeamId = TeamId.create();
    const teamId = TeamId.create();
    const pair1 = Pair.create({ teamId: teamId, name: PairName.create('Pair 1'), participantIds: [ParticipantId.create(), ParticipantId.create()] });
    const pair2 = Pair.create({ teamId: teamId, name: PairName.create('Pair 2'), participantIds: [ParticipantId.create(), ParticipantId.create(), ParticipantId.create()] });

    when(pairRepository.getAll()).thenResolve([pair1, pair2]);

    // 実行
    const result = await query.execute(targetTeamId);

    // 確認
    expect(result).toEqual([]);
    verify(pairRepository.getAll()).once();
  });
});
