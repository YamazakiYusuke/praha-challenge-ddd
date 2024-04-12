import { GetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { SaveAdministratorCommand } from "src/domain/commands/administrator/save-administrator-command";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { inject, injectable } from "tsyringe";
import { Administrator, AdministratorProps } from "../../entities/administrator";

@injectable()
export class CreateAdministratorService {
  constructor(
    @inject(GetAdministratorByEmailQuery)
    private readonly getAdministratorByEmailQuery: GetAdministratorByEmailQuery,
    @inject(SaveAdministratorCommand)
    private readonly saveAdministratorCommand: SaveAdministratorCommand,
  ) { }

  async execute(props: AdministratorProps): Promise<Administrator> {
    const existingAdministrator = await this.getAdministratorByEmailQuery.execute(props.email);
    if (existingAdministrator != null) {
      throw new DomainServiceError('こちらのEmailは既に登録済みです');
    }
    const newAdmin = Administrator.create(props) as Administrator;
    await this.saveAdministratorCommand.execute(newAdmin);
    return newAdmin;
  }
}