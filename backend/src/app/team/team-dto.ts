import { Team } from "src/domain/entities/team";

export class TeamDTO {
  public readonly id: string
  public readonly name: string;
  public readonly member: Array<string>;
  constructor(team: Team) {
    this.id = team.getId.value
    this.name = team.name.value
    this.member = team.member.map((e) => e.value);
  }
}