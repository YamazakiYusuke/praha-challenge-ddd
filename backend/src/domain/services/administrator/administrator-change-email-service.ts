import { Injectable } from "@nestjs/common";
import { GetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { EntityError } from "src/domain/errors/entity_error";
import { Email } from "src/domain/values/email";
import { Administrator } from "../../entities/administrator";

@Injectable()
export class AdministratorChangeEmailService {
  constructor(private readonly getOneAdministratorQuery: GetAdministratorByEmailQuery) { }

  async execute(administrator: Administrator, newEmail: Email): Promise<void | Error> {
    const existingAdministrator = await this.getOneAdministratorQuery.execute(newEmail);
    if (existingAdministrator != null) {
      throw new EntityError('こちらのEmailは既に登録済みです');
    }
    administrator.changeEmail(newEmail);
  }
}