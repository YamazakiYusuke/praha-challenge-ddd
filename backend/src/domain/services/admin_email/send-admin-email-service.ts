import { Inject, Injectable } from "@nestjs/common";
import { ISaveAdminMailCommand } from "src/domain/commands/admin-mail/save-admin-mail-command";
import { AdminEmail } from "src/domain/entities/admin-email";
import { ISendAdminMail } from "src/domain/mail/send-mail/send-admin-mail";
import { EmailStatus } from "src/util/enums";

export interface ISendAdminEmailService {
  execute(adminEmail: AdminEmail): Promise<void>;
}

@Injectable()
export class SendAdminEmailService implements ISendAdminEmailService {
  constructor(
    @Inject('ISendAdminMail')
    private readonly sendAdminMail: ISendAdminMail,
    @Inject('ISaveAdminMailCommand')
    private readonly saveAdminMailCommand: ISaveAdminMailCommand,
  ) { }

  async execute(adminEmail: AdminEmail): Promise<void> {
    try {
      adminEmail.setStatus(EmailStatus.Sending);
      await this.sendAdminMail.execute(adminEmail);
      adminEmail.setSentDateTime(new Date());
      adminEmail.setStatus(EmailStatus.Sent);
    } catch (error: any) {
      adminEmail.setErrorMessage(error.message);
      adminEmail.setStatus(EmailStatus.Error);
    } finally {
      this.saveAdminMailCommand.execute(adminEmail);
    }
  }
}