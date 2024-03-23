import { Administrator } from "../entities/administrator";

export interface IAdministratorRepository {
  save(administrator: Administrator, transaction?: any): Promise<void>
  getAll(): Promise<Administrator[]>
}
