import { Injectable } from "@nestjs/common";
import { GetAdministratorByEmailQuery } from "src/domain/commands/administrator/get-administrator-by-email-query";
import { EntityError } from "src/domain/errors/entity_error";
import { Administrator, AdministratorProps } from "../../entities/administrator";

@Injectable()
export class AdministratorCreateService {
  constructor(private readonly getOneAdministratorQuery: GetAdministratorByEmailQuery) { }

  async execute(props: AdministratorProps): Promise<Administrator | Error> {
    const existingAdministrator = await this.getOneAdministratorQuery.execute(props.email);
    if (existingAdministrator != null) {
      throw new EntityError('こちらのEmailは既に登録済みです');
    }
    return Administrator.create(props);
  }
}