import { Team } from "../entities/team";

export interface ITeamRepository {
  save(team: Team): Promise<void | Error>
  getAll(): Promise<Team[] | Error>
}