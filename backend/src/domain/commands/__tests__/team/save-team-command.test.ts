import { SaveTeamCommand } from 'src/domain/commands/team/save-team-command';
import { Team } from 'src/domain/entities/team';
import { ITeamRepository } from 'src/domain/repositories/team-repository';
import { GenerationId } from 'src/domain/values/ids';
import { TeamName } from 'src/domain/values/name';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# SaveTeamCommand UnitTest \n', () => {
  let command: SaveTeamCommand;
  let teamRepository: ITeamRepository;

  beforeEach(() => {
    teamRepository = mock<ITeamRepository>();
    command = new SaveTeamCommand(instance(teamRepository));
  });

  it('- should save team \n', async () => {
    // 準備
    const team = Team.create({ name: TeamName.create('Test Team'), participantIds: [], generationId: GenerationId.restore('1') });
    const transaction = {};

    when(teamRepository.save(anything(), anything())).thenResolve();

    // 実行
    await command.execute(team, transaction);

    // 確認
    verify(teamRepository.save(team, transaction)).once();
  });
});
