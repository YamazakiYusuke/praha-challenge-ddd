import { SaveAdminMailCommand } from "src/domain/commands/admin-mail/save-admin-mail-command";
import { AdminEmail } from "src/domain/entities/admin-email";
import { SendAdminMail } from "src/domain/mail/send-mail/send-admin-mail";
import { EmailStatus } from "src/domain/util/enums";
import { inject, injectable } from "tsyringe";

@injectable()
export class SendAdminEmailService {
  constructor(
    @inject(SendAdminMail)
    private readonly sendAdminMail: SendAdminMail,
    @inject(SaveAdminMailCommand)
    private readonly saveAdminMailCommand: SaveAdminMailCommand,
  ) { }

  async execute(adminEmail: AdminEmail): Promise<void> {
    try {
      adminEmail.setStatus(EmailStatus.Sending);
      await this.sendAdminMail.execute(adminEmail);
      adminEmail.setSentDateTime(new Date());
      adminEmail.setStatus(EmailStatus.Sent);
    } catch (error: any) {
      adminEmail.setStatus(EmailStatus.Error);
      adminEmail.setErrorMessage(error.message);
    } finally {
      this.saveAdminMailCommand.execute(adminEmail);
    }
  }
}