import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";

export class InMemoryAdministratorRepository implements IAdministratorRepository {
  private administrators: Administrator[] = [];

  async save(administrator: Administrator): Promise<void | Error> {
    this.administrators.push(administrator);
    return;
  }

  async getAll(): Promise<Administrator[] | Error> {
    return this.administrators;
  }
}
