import { Injectable } from "@nestjs/common";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { ICommand } from "../base/command";

@Injectable()
export class SaveAdministratorCommand implements ICommand<Administrator> {
  constructor(private readonly administratorRepository: IAdministratorRepository) { }

  async execute(administrator: Administrator): Promise<void | Error> {
    await this.administratorRepository.save(administrator);
  }
}
