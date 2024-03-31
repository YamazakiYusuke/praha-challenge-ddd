import { GetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { SaveAdministratorCommand } from "src/domain/commands/administrator/save-administrator-command";
import { EntityError } from "src/domain/errors/entity_error";
import { Email } from "src/domain/values/email";
import { inject, injectable } from "tsyringe";
import { Administrator } from "../../entities/administrator";

@injectable()
export class ChangeAdministratorEmailService {
  constructor(
    @inject(GetAdministratorByEmailQuery) 
    private readonly getAdministratorByEmailQuery: GetAdministratorByEmailQuery,
    @inject(SaveAdministratorCommand) 
    private readonly saveAdministratorCommand: SaveAdministratorCommand,
  ) { }

  async execute(administrator: Administrator, newEmail: Email): Promise<void> {
    const existingAdministrator = await this.getAdministratorByEmailQuery.execute(newEmail);
    if (existingAdministrator != null) {
      throw new EntityError('こちらのEmailは既に登録済みです');
    }
    administrator.changeEmail(newEmail);
    await this.saveAdministratorCommand.execute(administrator);
  }
}