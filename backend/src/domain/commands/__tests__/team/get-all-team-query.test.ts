import { GetAllTeamsQuery } from 'src/domain/commands/team/get-all-team-query';
import { Team } from 'src/domain/entities/team';
import { ITeamRepository } from 'src/domain/repositories/team-repository';
import { ParticipantId } from 'src/domain/values/ids';
import { TeamName } from 'src/domain/values/name';
import { instance, mock, verify, when } from 'ts-mockito';

describe('# GetAllTeamsQuery UnitTest \n', () => {
  let query: GetAllTeamsQuery;
  let teamRepository: ITeamRepository;

  beforeEach(() => {
    teamRepository = mock<ITeamRepository>();
    query = new GetAllTeamsQuery(instance(teamRepository));
  });

  it('- should get all teams \n', async () => {
    // 準備
    const teams: Team[] = [Team.create({ name: TeamName.create('Team 1'), participantIds: [ParticipantId.create(), ParticipantId.create()], generationId: '1' }), Team.create({ name: TeamName.create('Team 2'), participantIds: [ParticipantId.create(), ParticipantId.create()], generationId: '2' })];

    when(teamRepository.getAll()).thenResolve(teams);

    // 実行
    const result = await query.execute();

    // 確認
    verify(teamRepository.getAll()).once();
    expect(result).toEqual(teams);
  });
});
