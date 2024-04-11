import { AdminEmail } from "src/domain/entities/admin-email";
import { IAdminMailRepository } from "src/domain/repositories/admin-mail-repository";
import { inject, injectable } from "tsyringe";
import { ICommand } from "../base/command";

@injectable()
export class SaveAdminMailCommand implements ICommand<AdminEmail> {
  constructor(
    @inject('IAdminMailRepository')
    private readonly adminMailRepository: IAdminMailRepository
  ) { }

  async execute(mail: AdminEmail, transaction?: any): Promise<void> {
    await this.adminMailRepository.save(mail, transaction);
  }
}
