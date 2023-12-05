import { Team } from "../entities/team";

export interface ITeamRepository {
  save(team: Team): Promise<Team>
  getAll(): Promise<Team[]>
}
