import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Administrator, AdministratorProps } from "../../entities/administrator";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { GetOneAdministratorQuery } from "src/domain/commands/administrator/get-one-administrator-query";
import { Injectable } from "@nestjs/common";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Email } from "src/domain/values/email";

@Injectable()
export class AdministratorChangeEmailService {
  constructor(private readonly getOneAdministratorQuery: GetOneAdministratorQuery) {}

  async execute(administrator: Administrator, newEmail: Email): Promise<Administrator| RepositoryError  | EntityCreationError> {
    const existingAdministrator = await this.getOneAdministratorQuery.execute(newEmail);
    if (existingAdministrator != null) {
      throw new EntityCreationError('こちらのEmailは既に登録済みです');
    }
    const modifiedAdministrator = administrator.changeEmail(newEmail);
    return modifiedAdministrator;
  }
}