import { Injectable } from "@nestjs/common";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetAllAdministratorsQuery implements IGetQuery<Administrator[]> {
  constructor(private readonly administratorRepository: IAdministratorRepository) { }

  async execute(): Promise<Administrator[] | Error> {
    return await this.administratorRepository.getAll();
  }
}
