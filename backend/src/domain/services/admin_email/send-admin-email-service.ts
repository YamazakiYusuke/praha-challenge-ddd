import { Inject, Injectable } from "@nestjs/common";
import { AdminEmail } from "src/domain/entities/admin-email";
import { IMailSenderRepository } from "src/domain/repositories/mail-sender-repository";
import { EmailStatus } from "src/util/enums";

export interface ISendAdminEmailService {
  execute(adminEmail: AdminEmail): Promise<void>;
}

@Injectable()
export class SendAdminEmailService implements ISendAdminEmailService {
  constructor(
    @Inject('IMailSenderRepository')
    private readonly mailSenderRepository: IMailSenderRepository
  ) { }

  async execute(adminEmail: AdminEmail): Promise<void> {
    try {
      adminEmail.setStatus(EmailStatus.Sending);
      await this.mailSenderRepository.send(adminEmail);
      adminEmail.setSentDateTime(new Date());
      adminEmail.setStatus(EmailStatus.Sent);
    } catch (error: any) {
      adminEmail.setErrorMessage(error.message);
      adminEmail.setStatus(EmailStatus.Error);
    }
    // TODO: adminEmail　永続化
  }
}