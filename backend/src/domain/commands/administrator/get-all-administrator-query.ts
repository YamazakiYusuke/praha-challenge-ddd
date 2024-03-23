import { Inject, Injectable } from "@nestjs/common";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { IGetQuery } from "../base/get-query";

export interface IGetAllAdministratorsQuery extends IGetQuery<Administrator[]> {
  execute(): Promise<Administrator[]>;
}

@Injectable()
export class GetAllAdministratorsQuery implements IGetAllAdministratorsQuery {
  constructor(
    @Inject('IAdministratorRepository')
    private readonly administratorRepository: IAdministratorRepository
  ) { }

  async execute(): Promise<Administrator[]> {
    return await this.administratorRepository.getAll();
  }
}
