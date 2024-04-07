import { Dto } from "src/app/base/dto";
import { Team } from "src/domain/entities/team";
import { GenerationId, ParticipantId, TeamId } from "src/domain/values/id";
import { TeamName } from "src/domain/values/name";

export class TeamDto extends Dto<Team> {
  public readonly id: string;
  public readonly name: string;
  public readonly participantIds: string[];
  public readonly generationId: string;

  constructor(team: Team) {
    super();
    this.id = team.id.value;
    this.name = team.name.value;
    this.participantIds = team.participantIds.map(id => id.value);
    this.generationId = team.generationId.value;
  }

  get toEntity(): Team {
    const teamId = TeamId.restore(this.id);
    const teamName = TeamName.restore(this.name);
    const participantIds = this.participantIds.map(id => ParticipantId.restore(id));
    const generationId = GenerationId.restore(this.generationId);

    return Team.restore(teamId, {
      name: teamName,
      participantIds,
      generationId,
    });
  }
}
