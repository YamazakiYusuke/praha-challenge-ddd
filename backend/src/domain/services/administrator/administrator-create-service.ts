import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Administrator, AdministratorProps } from "../../entities/administrator";
import { EntityCreationError } from "../../errors/entity_creation_error";
import { GetOneAdministratorQuery } from "src/domain/commands/administrator/get-one-administrator-query";
import { Injectable } from "@nestjs/common";
import { RepositoryError } from "src/domain/errors/repository_error";

@Injectable()
export class AdministratorCreateService {
  constructor(private readonly getOneAdministratorQuery: GetOneAdministratorQuery) {}

  async execute(props: AdministratorProps): Promise<Administrator | RepositoryError  | EntityCreationError> {
    const existingAdministrator = await this.getOneAdministratorQuery.execute(props.email);
    if (existingAdministrator != null) {
      throw new EntityCreationError('こちらのEmailは既に登録済みです');
    }
    return Administrator.create(props);
  }
}