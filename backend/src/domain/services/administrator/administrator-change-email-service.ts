import { Inject, Injectable } from "@nestjs/common";
import { IGetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { ISaveAdministratorCommand } from "src/domain/commands/administrator/save-administrator-command";
import { EntityError } from "src/domain/errors/entity_error";
import { Email } from "src/domain/values/email";
import { Administrator } from "../../entities/administrator";

export interface IAdministratorChangeEmailService {
  execute(administrator: Administrator, newEmail: Email): Promise<void | Error>;
}

@Injectable()
export class AdministratorChangeEmailService implements IAdministratorChangeEmailService {
  constructor(
    @Inject('IGetAdministratorByEmailQuery')
    private readonly getAdministratorByEmailQuery: IGetAdministratorByEmailQuery,
    @Inject('ISaveAdministratorCommand')
    private readonly saveAdministratorCommand: ISaveAdministratorCommand,
  ) { }

  async execute(administrator: Administrator, newEmail: Email): Promise<void | Error> {
    const existingAdministrator = await this.getAdministratorByEmailQuery.execute(newEmail);
    if (existingAdministrator != null) {
      throw new EntityError('こちらのEmailは既に登録済みです');
    }
    administrator.changeEmail(newEmail);
    await this.saveAdministratorCommand.execute(administrator);
  }
}