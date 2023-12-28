import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";

export class InMemoryTeamRepository implements ITeamRepository {
  private teams: Team[] = [];

  async save(team: Team): Promise<void | Error> {
    this.teams.push(team);
    return;
  }

  async getAll(): Promise<Team[] | Error> {
    return this.teams;
  }
}
