import { Inject, Injectable } from "@nestjs/common";
import { AdminEmail } from "src/domain/entities/admin-email";
import { IAdminMailRepository } from "src/domain/repositories/admin-mail-repository";
import { ICommand } from "../base/command";

export interface ISaveAdminMailCommand extends ICommand<AdminEmail> {
  execute(mail: AdminEmail, transaction?: any): Promise<void>;
}

@Injectable()
export class SaveAdminMailCommand implements ISaveAdminMailCommand {
  constructor(
    @Inject('IAdminMailRepository')
    private readonly adminMailRepository: IAdminMailRepository
  ) { }

  async execute(mail: AdminEmail, transaction?: any): Promise<void> {
    await this.adminMailRepository.save(mail, transaction);
  }
}
