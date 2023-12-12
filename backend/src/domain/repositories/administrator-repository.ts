import { Administrator } from "../entities/administrator";
import { RepositoryError } from "../errors/repository_error";
import { Email } from "../values/email";

export interface IAdministratorRepository {
  save(administrator: Administrator): Promise<void | RepositoryError>
  getAll(): Promise<Administrator[] | RepositoryError>
}
