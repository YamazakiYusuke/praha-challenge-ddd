import { Administrator } from "../entities/administrator";

export interface IAdministratorRepository {
  save(administrator: Administrator, transaction?: any): Promise<void | Error>
  getAll(): Promise<Administrator[] | Error>
}
