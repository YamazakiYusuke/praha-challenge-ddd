import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Administrator, AdministratorProps } from "../../entities/administrator";
import { GetOneAdministratorQuery } from "src/domain/commands/administrator/get-one-administrator-query";
import { Injectable } from "@nestjs/common";
import { RepositoryError } from "src/domain/errors/repository_error";
import { EntityError } from "src/domain/errors/entity_error";

@Injectable()
export class AdministratorCreateService {
  constructor(private readonly getOneAdministratorQuery: GetOneAdministratorQuery) { }

  async execute(props: AdministratorProps): Promise<Administrator | Error> {
    const existingAdministrator = await this.getOneAdministratorQuery.execute(props.email);
    if (existingAdministrator != null) {
      throw new EntityError('こちらのEmailは既に登録済みです');
    }
    return Administrator.create(props);
  }
}