import { Team } from "../entities/team";

export interface ITeamRepository {
  save(team: Team): Promise<Team | RepositoryError>
  getAll(): Promise<Team[] | RepositoryError>
}