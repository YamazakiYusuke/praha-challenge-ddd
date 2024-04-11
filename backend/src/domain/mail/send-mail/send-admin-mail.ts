import { AdminEmail } from "src/domain/entities/admin-email";
import { ISendAdminMailRepository } from "src/domain/repositories/send-admin-mail-repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class SendAdminMail {
  constructor(
    @inject('ISendAdminMailRepository')
    private readonly sendMailRepository: ISendAdminMailRepository
  ) { }

  async execute(mail: AdminEmail): Promise<void> {
    await this.sendMailRepository.send(mail);
  }
}
