import { Team } from "src/domain/entities/team";
import { ITeamRepository } from "src/domain/repositories/team-repository";

export class InMemoryTeamRepository implements ITeamRepository {
  private teams: Team[] = [];

  async save(team: Team): Promise<void> {
    this.teams.push(team);
    return;
  }

  async getAll(): Promise<Team[]> {
    return this.teams;
  }
}
