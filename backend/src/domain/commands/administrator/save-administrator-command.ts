import { Inject, Injectable } from "@nestjs/common";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { ICommand } from "../base/command";

@Injectable()
export class SaveAdministratorCommand implements ICommand<Administrator> {
  constructor(
    @Inject('IAdministratorRepository')
    private readonly administratorRepository: IAdministratorRepository
  ) { }

  async execute(administrator: Administrator, transaction?: any): Promise<void> {
    await this.administratorRepository.save(administrator, transaction);
  }
}
