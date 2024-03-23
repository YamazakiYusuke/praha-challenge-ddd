import { Inject, Injectable } from "@nestjs/common";
import { IGetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { ISaveAdministratorCommand } from "src/domain/commands/administrator/save-administrator-command";
import { EntityError } from "src/domain/errors/entity_error";
import { Administrator, AdministratorProps } from "../../entities/administrator";

export interface IAdministratorCreateService {
  execute(props: AdministratorProps): Promise<Administrator>;
}

@Injectable()
export class AdministratorCreateService implements IAdministratorCreateService {
  constructor(
    @Inject('IGetAdministratorByEmailQuery')
    private readonly getAdministratorByEmailQuery: IGetAdministratorByEmailQuery,
    @Inject('ISaveAdministratorCommand')
    private readonly saveAdministratorCommand: ISaveAdministratorCommand,
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