import { Injectable } from "@nestjs/common";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { IGetAllQuery } from "../base/get-all-query";

@Injectable()
export class GetAllAdministratorsQuery implements IGetAllQuery<Administrator[]> {
  constructor(private readonly administratorRepository: IAdministratorRepository) { }

  async execute(): Promise<Administrator[] | Error> {
    return await this.administratorRepository.getAll();
  }
}
