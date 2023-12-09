import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Administrator, AdministratorProps } from "../../entities/administrator";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { SaveAdministratorCommand } from "src/domain/commands/administrator/save-administrator-command";
import { GetOneAdministratorQuery } from "src/domain/commands/administrator/get-one-administrator-query";

export class AdministratorCreateService {
  constructor(private readonly repo: IAdministratorRepository) {}

  async execute(props: AdministratorProps): Promise<Administrator | EntityCreationError> {
    const getOneAdministratorQuery = new GetOneAdministratorQuery(props.email, this.repo);
    const administrator = await getOneAdministratorQuery.execute();
    if (administrator != null) {
      throw new EntityCreationError('こちらのEmailは既に登録済みです');
    }
    return Administrator.create(props);
  }
}