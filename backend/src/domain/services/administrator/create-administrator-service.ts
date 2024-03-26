import { GetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { SaveAdministratorCommand } from "src/domain/commands/administrator/save-administrator-command";
import { EntityError } from "src/domain/errors/entity_error";
import { container } from "tsyringe";
import { Administrator, AdministratorProps } from "../../entities/administrator";

export interface ICreateAdministratorService {
  execute(props: AdministratorProps): Promise<Administrator>;
}

export class CreateAdministratorService implements ICreateAdministratorService {
  constructor(
    private readonly getAdministratorByEmailQuery: GetAdministratorByEmailQuery = container.resolve(GetAdministratorByEmailQuery),
    private readonly saveAdministratorCommand: SaveAdministratorCommand = container.resolve(SaveAdministratorCommand),
  ) { }

  async execute(props: AdministratorProps): Promise<Administrator> {
    const existingAdministrator = await this.getAdministratorByEmailQuery.execute(props.email);
    if (existingAdministrator != null) {
      throw new EntityError('こちらのEmailは既に登録済みです');
    }
    const newAdmin = Administrator.create(props) as Administrator;
    await this.saveAdministratorCommand.execute(newAdmin);
    return newAdmin;
  }
}