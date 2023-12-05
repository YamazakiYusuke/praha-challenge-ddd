import { Administrator } from "../entities/administrator/administrator";

export interface IAdministratorRepository {
  save(assignment: Administrator): Promise<Administrator>
  getAll(): Promise<Administrator[]>
}
