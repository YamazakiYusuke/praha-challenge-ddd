import { AdminEmail } from 'src/domain/entities/admin-email';
import { AdminEmailContent } from 'src/domain/values/admin-email-content';
import { EmailStatus } from 'src/util/enums';
import { SendAdminEmailService } from 'src/domain/services/admin_email/send-admin-email-service';
import { SendAdminMail } from 'src/domain/mail/send-mail/send-admin-mail';
import { SaveAdminMailCommand } from 'src/domain/commands/admin-mail/save-admin-mail-command';
import { anything, instance, mock, verify, when } from 'ts-mockito';

describe('# SendAdminEmailService UnitTest\n', () => {
  let sendAdminMail: SendAdminMail;
  let saveAdminMailCommand: SaveAdminMailCommand;
  let sendAdminEmailService: SendAdminEmailService;
  let adminEmail: AdminEmail;

  beforeEach(() => {
    sendAdminMail = mock(SendAdminMail);
    saveAdminMailCommand = mock(SaveAdminMailCommand);
    sendAdminEmailService = new SendAdminEmailService(instance(sendAdminMail), instance(saveAdminMailCommand));
    
    const adminEmailContent = AdminEmailContent.restore({
      title: 'Test Email Title',
      body: 'Test Email Body',
    });
    adminEmail = AdminEmail.create({
      content: adminEmailContent,
      recipients: [],
      status: EmailStatus.Pending,
    });
  });

  describe('## execute\n', () => {
    test('- should send an admin email successfully\n', async () => {
      // 準備
      when(sendAdminMail.execute(anything())).thenResolve();
      // 実行
      await sendAdminEmailService.execute(adminEmail);
      // 確認
      verify(sendAdminMail.execute(anything())).once();
      verify(saveAdminMailCommand.execute(anything())).once();
      expect(adminEmail.status).toEqual(EmailStatus.Sent);
    });

    test('- should handle email sending error\n', async () => {
      // 準備
      const errorMessage = 'Sending Failed';
      when(sendAdminMail.execute(anything())).thenReject(new Error(errorMessage));
      // 実行
      await sendAdminEmailService.execute(adminEmail);
      // 確認
      verify(sendAdminMail.execute(anything())).once();
      verify(saveAdminMailCommand.execute(anything())).once();
      expect(adminEmail.status).toEqual(EmailStatus.Error);
      expect(adminEmail.errorMessage).toEqual(errorMessage);
    });
  });
});
