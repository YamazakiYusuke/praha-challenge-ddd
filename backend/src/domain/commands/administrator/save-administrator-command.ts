import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { inject, injectable } from "tsyringe";
import { ICommand } from "../base/command";

@injectable()
export class SaveAdministratorCommand implements ICommand<Administrator> {
  constructor(
    @inject('IAdministratorRepository')
    private readonly administratorRepository: IAdministratorRepository
  ) { }

  async execute(administrator: Administrator, transaction?: any): Promise<void> {
    await this.administratorRepository.save(administrator, transaction);
  }
}
