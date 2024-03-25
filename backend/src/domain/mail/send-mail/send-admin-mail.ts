import { Inject, Injectable } from "@nestjs/common";
import { AdminEmail } from "src/domain/entities/admin-email";
import { ISendMailRepository } from "src/domain/repositories/send-mail-repository";


export interface SendAdminMail {
  execute(mail: AdminEmail): Promise<void>;
}

@Injectable()
export class SendAdminMail {
  constructor(
    @Inject('ISendMailRepository')
    private readonly sendMailRepository: ISendMailRepository
  ) { }

  async execute(mail: AdminEmail): Promise<void> {
    await this.sendMailRepository.send(mail);
  }
}
