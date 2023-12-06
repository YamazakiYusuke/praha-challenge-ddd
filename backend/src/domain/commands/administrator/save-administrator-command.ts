import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { ICommand } from "../base/command";
import { RepositoryError } from "src/domain/errors/repository_error";

export class SaveAdministratorCommand implements ICommand {
  constructor(private administrator: Administrator, private administratorRepository: IAdministratorRepository) {}

  async execute(): Promise<void | RepositoryError> {
    await this.administratorRepository.save(this.administrator);
  }
}
