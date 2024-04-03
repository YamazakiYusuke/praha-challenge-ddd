import { GetPairWithFewestMembersByTeamIdQuery } from 'src/domain/commands/pair/get-pair-with-fewest-members-by-team-id-query';
import { Pair } from 'src/domain/entities/pair';
import { CommandError } from 'src/domain/errors/command_error';
import { IPairRepository } from 'src/domain/repositories/pair-repository';
import { PairId, ParticipantId, TeamId } from 'src/domain/values/id';
import { PairName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetPairWithFewestMembersByTeamIdQuery UnitTest \n', () => {
  let query: GetPairWithFewestMembersByTeamIdQuery;
  let pairRepository: IPairRepository;

  beforeEach(() => {
    pairRepository = mock<IPairRepository>();
    query = new GetPairWithFewestMembersByTeamIdQuery(instance(pairRepository));
  });

  it('- should get null when pairRepository.getAll returns empty array \n', async () => {
    // 準備
    const teamId = TeamId.create();
    when(pairRepository.getAll()).thenResolve([]);

    // 実行
    const result = await query.execute(teamId);

    // 確認
    expect(result).toBeNull;
    verify(pairRepository.getAll()).once();
  });

  it('- should get null when excludePairId remove last one pair \n', async () => {
    // 準備
    const teamId = TeamId.create();
    const pairId = PairId.create();
    const pair = Pair.restore(pairId, { teamId: teamId, name: PairName.create('Pair 1'), participantIds: [ParticipantId.create(), ParticipantId.create()] });

    when(pairRepository.getAll()).thenResolve([pair]);

    // 実行
    const result = await query.execute(teamId);

    // 確認
    expect(result).toBeNull;
    verify(pairRepository.getAll()).once();
  });

  it('- should get pair with fewest members by team id \n', async () => {
    // 準備
    const teamId = TeamId.create();
    const pairId = PairId.create();
    const fewestPair = Pair.restore(pairId, { teamId: teamId, name: PairName.create('Pair 1'), participantIds: [ParticipantId.create(), ParticipantId.create()] });
    const pair = Pair.restore(pairId, { teamId: teamId, name: PairName.create('Pair 2'), participantIds: [ParticipantId.create(), ParticipantId.create(), ParticipantId.create()] });
    when(pairRepository.getAll()).thenResolve([fewestPair, pair]);

    // 実行
    const result = await query.execute(teamId);

    // 確認
    expect(result).toEqual(fewestPair);
    verify(pairRepository.getAll()).once();
  });
});
