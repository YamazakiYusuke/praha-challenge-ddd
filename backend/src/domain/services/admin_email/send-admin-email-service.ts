import { SaveAdminMailCommand } from "src/domain/commands/admin-mail/save-admin-mail-command";
import { AdminEmail } from "src/domain/entities/admin-email";
import { SendAdminMail } from "src/domain/mail/send-mail/send-admin-mail";
import { EmailStatus } from "src/util/enums";
import { container } from "tsyringe";

export interface ISendAdminEmailService {
  execute(adminEmail: AdminEmail): Promise<void>;
}

export class SendAdminEmailService implements ISendAdminEmailService {
  constructor(
    private readonly sendAdminMail: SendAdminMail = container.resolve(SendAdminMail),
    private readonly saveAdminMailCommand: SaveAdminMailCommand = container.resolve(SaveAdminMailCommand),
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