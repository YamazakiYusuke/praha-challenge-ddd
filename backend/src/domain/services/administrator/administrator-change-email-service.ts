import { Inject, Injectable } from "@nestjs/common";
import { IGetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
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
    private readonly getAdministratorByEmailQuery: IGetAdministratorByEmailQuery
  ) { }

  async execute(administrator: Administrator, newEmail: Email): Promise<void | Error> {
    const existingAdministrator = await this.getAdministratorByEmailQuery.execute(newEmail);
    if (existingAdministrator != null) {
      throw new EntityError('こちらのEmailは既に登録済みです');
    }
    administrator.changeEmail(newEmail);
  }
}