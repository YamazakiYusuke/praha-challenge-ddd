import { Injectable, Inject } from "@nestjs/common";
import { IGetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { EntityError } from "src/domain/errors/entity_error";
import { Administrator, AdministratorProps } from "../../entities/administrator";

export interface IAdministratorCreateService {
  execute(props: AdministratorProps): Promise<Administrator | Error>;
}

@Injectable()
export class AdministratorCreateService implements IAdministratorCreateService {
  constructor(
    @Inject('IGetAdministratorByEmailQuery')
    private readonly getAdministratorByEmailQuery: IGetAdministratorByEmailQuery
  ) { }

  async execute(props: AdministratorProps): Promise<Administrator | Error> {
    const existingAdministrator = await this.getAdministratorByEmailQuery.execute(props.email);
    if (existingAdministrator != null) {
      throw new EntityError('こちらのEmailは既に登録済みです');
    }
    return Administrator.create(props);
  }
}