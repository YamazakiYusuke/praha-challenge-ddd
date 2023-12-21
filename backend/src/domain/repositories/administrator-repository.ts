import { Administrator } from "../entities/administrator";

export interface IAdministratorRepository {
  save(administrator: Administrator): Promise<void | Error>
  getAll(): Promise<Administrator[] | Error>
}
