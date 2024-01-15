import { Team } from "src/domain/entities/team";

export class TeamDTO {
  public readonly id: string
  public readonly name: string;
  constructor(team: Team) {
    this.id = team.id.value
    this.name = team.name.value;
  }
}