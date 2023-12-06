import { Administrator } from "../entities/administrator";
import { Email } from "../values/email";

export interface IAdministratorRepository {
  save(administrator: Administrator): Promise<Administrator | RepositoryError>
  get(email: Email): Promise<Administrator | null | RepositoryError>
  getAll(): Promise<Administrator[] | RepositoryError>
}
