import { Inject, Injectable } from "@nestjs/common";
import { AdminEmail } from "src/domain/entities/admin-email";
import { ISendAdminMailRepository } from "src/domain/repositories/send-admin-mail-repository";


export interface ISendAdminMail {
  execute(mail: AdminEmail): Promise<void>;
}

@Injectable()
export class SendAdminMail implements ISendAdminMail {
  constructor(
    @Inject('ISendAdminMailRepository')
    private readonly sendMailRepository: ISendAdminMailRepository
  ) { }

  async execute(mail: AdminEmail): Promise<void> {
    await this.sendMailRepository.send(mail);
  }
}
