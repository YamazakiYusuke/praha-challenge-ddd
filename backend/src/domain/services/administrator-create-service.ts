import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Administrator, AdministratorProps } from "../entities/administrator";

export class AdministratorCreateService {
  constructor(private readonly repo: IAdministratorRepository) {}

  async createAdministrator(props: AdministratorProps): Promise<Administrator | EntityCreationError> {
    const administrator = await this.repo.get(props.email);
    if (administrator != null) {
      throw new EntityCreationError('こちらのEmailは既に登録済みです');
    }
    return Administrator.create(props);
  }
}