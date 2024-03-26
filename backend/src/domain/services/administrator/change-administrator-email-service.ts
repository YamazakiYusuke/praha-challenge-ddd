import { Inject, Injectable } from "@nestjs/common";
import { GetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { SaveAdministratorCommand } from "src/domain/commands/administrator/save-administrator-command";
import { EntityError } from "src/domain/errors/entity_error";
import { Email } from "src/domain/values/email";
import { container } from "tsyringe";
import { Administrator } from "../../entities/administrator";

export interface IChangeAdministratorEmailService {
  execute(administrator: Administrator, newEmail: Email): Promise<void>;
}

export class ChangeAdministratorEmailService implements IChangeAdministratorEmailService {
  constructor(
    private readonly getAdministratorByEmailQuery: GetAdministratorByEmailQuery = container.resolve(GetAdministratorByEmailQuery),
    private readonly saveAdministratorCommand: SaveAdministratorCommand = container.resolve(SaveAdministratorCommand),
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