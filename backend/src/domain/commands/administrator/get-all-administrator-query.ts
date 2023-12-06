import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetAllQuery } from "../base/get-all-query";


export class GetAllAdministratorsQuery implements IGetAllQuery<Administrator[]> {
  constructor(private administratorRepository: IAdministratorRepository) { }

  async execute(): Promise<Administrator[] | RepositoryError> {
    return await this.administratorRepository.getAll();
  }
}
