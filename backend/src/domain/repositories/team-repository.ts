import { Team } from "../entities/team";

export interface ITeamRepository {
  save(team: Team, transaction?: any): Promise<void>
  getAll(): Promise<Team[]>
}