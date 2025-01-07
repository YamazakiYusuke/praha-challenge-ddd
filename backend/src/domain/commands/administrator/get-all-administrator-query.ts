import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { inject, injectable } from "tsyringe";
import { IGetQuery } from "../base/get-query";

@injectable()
export class GetAllAdministratorsQuery implements IGetQuery<Administrator[]> {
  constructor(
    @inject('IAdministratorRepository')
    private readonly administratorRepository: IAdministratorRepository
  ) { }

  async execute(): Promise<Administrator[]> {
    return await this.administratorRepository.getAll();
  }
}
