import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveAdministratorCommand implements ICommand<Administrator> {
  constructor(private readonly administratorRepository: IAdministratorRepository) {}

  async execute(administrator: Administrator): Promise<void | RepositoryError> {
    await this.administratorRepository.save(administrator);
  }
}
