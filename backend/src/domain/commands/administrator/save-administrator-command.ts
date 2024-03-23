import { Inject, Injectable } from "@nestjs/common";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { ICommand } from "../base/command";

export interface ISaveAdministratorCommand extends ICommand<Administrator> {
  execute(administrator: Administrator, transaction?: any): Promise<void>;
}

@Injectable()
export class SaveAdministratorCommand implements ISaveAdministratorCommand {
  constructor(
    @Inject('IAdministratorRepository')
    private readonly administratorRepository: IAdministratorRepository
  ) { }

  async execute(administrator: Administrator, transaction?: any): Promise<void> {
    await this.administratorRepository.save(administrator, transaction);
  }
}
