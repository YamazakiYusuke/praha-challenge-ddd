import { Team } from "../entities/team";

export interface ITeamRepository {
  save(team: Team, transaction?: any): Promise<void | Error>
  getAll(): Promise<Team[] | Error>
}