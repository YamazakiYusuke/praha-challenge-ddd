import { Inject, Injectable } from "@nestjs/common";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Email } from "src/domain/values/email";
import { IGetQuery } from "../base/get-query";

@Injectable()
export class GetAdministratorByEmailQuery implements IGetQuery<Administrator, Email> {
  constructor(
    @Inject('IAdministratorRepository')
    private readonly administratorRepository: IAdministratorRepository
  ) { }

  async execute(email: Email): Promise<Administrator | null> {
    const administrators = await this.administratorRepository.getAll();
    return administrators.find(admin => admin.email.isEqual(email)) || null;
  }
}
