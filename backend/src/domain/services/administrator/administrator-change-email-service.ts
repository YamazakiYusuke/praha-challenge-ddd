import { Administrator } from "../../entities/administrator";
import { GetOneAdministratorQuery } from "src/domain/commands/administrator/get-one-administrator-query";
import { Injectable } from "@nestjs/common";
import { Email } from "src/domain/values/email";
import { EntityError } from "src/domain/errors/entity_error";

@Injectable()
export class AdministratorChangeEmailService {
  constructor(private readonly getOneAdministratorQuery: GetOneAdministratorQuery) { }

  async execute(administrator: Administrator, newEmail: Email): Promise<void | Error> {
    const existingAdministrator = await this.getOneAdministratorQuery.execute(newEmail);
    if (existingAdministrator != null) {
      throw new EntityError('こちらのEmailは既に登録済みです');
    }
    administrator.changeEmail(newEmail);
  }
}