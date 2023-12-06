import { Team } from "../entities/team";
import { RepositoryError } from "../errors/repository_error";

export interface ITeamRepository {
  save(team: Team): Promise<void | RepositoryError>
  getAll(): Promise<Team[] | RepositoryError>
}