import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Name } from "src/domain/values/name";
import { IGetOneQuery } from "../base/get-one-query";

export class GetOneAdministratorQuery implements IGetOneQuery<Administrator, Name> {
  constructor(private administratorRepository: IAdministratorRepository) { }

  async execute(name: Name): Promise<Administrator | null | RepositoryError> {
    return await this.administratorRepository.get(name);
  }
}
