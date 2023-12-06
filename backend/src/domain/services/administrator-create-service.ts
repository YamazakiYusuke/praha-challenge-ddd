import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Administrator, AdministratorProps } from "../entities/administrator";
import { EntityCreationError } from "../errors/entity_creation_error";

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