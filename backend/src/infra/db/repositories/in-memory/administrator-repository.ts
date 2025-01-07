import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";

export class InMemoryAdministratorRepository implements IAdministratorRepository {
  private administrators: Administrator[] = [];

  async save(administrator: Administrator): Promise<void> {
    this.administrators.push(administrator);
    return;
  }

  async getAll(): Promise<Administrator[]> {
    return this.administrators;
  }
}
