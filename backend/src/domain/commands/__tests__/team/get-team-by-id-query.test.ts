import { GetTeamByIdQuery } from 'src/domain/commands/team/get-team-by-id-query';
import { Team } from 'src/domain/entities/team';
import { ITeamRepository } from 'src/domain/repositories/team-repository';
import { ParticipantId, TeamId } from 'src/domain/values/ids';
import { TeamName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetTeamByIdQuery UnitTest \n', () => {
  let query: GetTeamByIdQuery;
  let teamRepository: ITeamRepository;

  beforeEach(() => {
    teamRepository = mock<ITeamRepository>();
    query = new GetTeamByIdQuery(instance(teamRepository));
  });

  it('- should get team by id \n', async () => {
    // 準備
    const teamId = TeamId.create();
    const team = Team.restore(teamId, { name: TeamName.create('Test Team'), participantIds: [ParticipantId.create()], generationId: '1' });

    when(teamRepository.getAll()).thenResolve([team]);

    // 実行
    const result = await query.execute(teamId);

    // 確認
    verify(teamRepository.getAll()).once();
    expect(result).toEqual(team);
  });
});
