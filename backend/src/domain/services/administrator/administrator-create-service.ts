import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Administrator, AdministratorProps } from "../../entities/administrator";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { GetOneAdministratorQuery } from "src/domain/commands/administrator/get-one-administrator-query";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdministratorCreateService {
  constructor(private readonly getOneAdministratorQuery: GetOneAdministratorQuery) {}

  async execute(props: AdministratorProps): Promise<Administrator | EntityCreationError> {
    const administrator = await this.getOneAdministratorQuery.execute(props.email);
    if (administrator != null) {
      throw new EntityCreationError('こちらのEmailは既に登録済みです');
    }
    return Administrator.create(props);
  }
}