import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { RepositoryError } from "src/domain/errors/repository_error";
import { IGetOneQuery } from "../base/get-one-query";
import { Injectable } from "@nestjs/common";
import { Email } from "src/domain/values/email";

@Injectable()
export class GetOneAdministratorQuery implements IGetOneQuery<Administrator, Email> {
  constructor(private administratorRepository: IAdministratorRepository) { }

  async execute(email: Email): Promise<Administrator | null | RepositoryError> {
    return await this.administratorRepository.get(email);
  }
}
