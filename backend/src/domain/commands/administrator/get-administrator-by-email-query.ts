import { Inject, Injectable } from "@nestjs/common";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Email } from "src/domain/values/email";
import { IGetQuery } from "../base/get-query";

export interface IGetAdministratorByEmailQuery extends IGetQuery<Administrator, Email> {
  execute(email: Email): Promise<Administrator | null>;
}

@Injectable()
export class GetAdministratorByEmailQuery implements IGetAdministratorByEmailQuery {
  constructor(
    @Inject('IAdministratorRepository')
    private readonly administratorRepository: IAdministratorRepository
  ) { }

  async execute(email: Email): Promise<Administrator | null> {
    const administrators = await this.administratorRepository.getAll();
    return administrators.find(admin => admin.email.isEqual(email)) || null;
  }
}
