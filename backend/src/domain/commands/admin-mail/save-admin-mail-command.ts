import { Inject, Injectable } from "@nestjs/common";
import { AdminEmail } from "src/domain/entities/admin-email";
import { IAdminMailRepository } from "src/domain/repositories/admin-mail-repository";
import { ICommand } from "../base/command";

@Injectable()
export class SaveAdminMailCommand implements ICommand<AdminEmail> {
  constructor(
    @Inject('IAdminMailRepository')
    private readonly adminMailRepository: IAdminMailRepository
  ) { }

  async execute(mail: AdminEmail, transaction?: any): Promise<void> {
    await this.adminMailRepository.save(mail, transaction);
  }
}
