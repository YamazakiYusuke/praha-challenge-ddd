import { Injectable } from "@nestjs/common";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Email } from "src/domain/values/email";
import { IGetOneQuery } from "../base/get-one-query";

@Injectable()
export class GetAdministratorByEmailQuery implements IGetOneQuery<Administrator, Email> {
  constructor(private readonly administratorRepository: IAdministratorRepository) { }

  async execute(email: Email): Promise<Administrator | null | Error> {
    const result = await this.administratorRepository.getAll();
    const administrators = result as Administrator[];
    return administrators.find((admin: Administrator) => admin.email.isEqual(email)) || null;
  }
}
