import { Administrator } from "../entities/administrator";

export interface IAdministratorRepository {
  save(administrator: Administrator): Promise<Administrator | RepositoryError>
  getAll(): Promise<Administrator[] | RepositoryError>
}
