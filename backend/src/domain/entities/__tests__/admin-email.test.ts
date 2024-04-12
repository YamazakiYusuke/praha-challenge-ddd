import { Administrator } from "src/domain/entities/administrator";
import { EntityError } from "src/domain/errors/entity_error";
import { EmailStatus } from "src/domain/util/enums";
import { AdminEmailContent } from "src/domain/values/admin-email-content";
import { Email } from "src/domain/values/email";
import { AdminEmailId } from "src/domain/values/ids";
import { AdminEmail, AdminEmailProps } from "../admin-email";

describe('# AdminEmail Entity UnitTest\n', () => {
  describe('## create\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const content = AdminEmailContent.join({ name: { value: "Test Participant" } } as any);
      const recipient = Administrator.create({ email: Email.create("test@example.com") });
      const props: AdminEmailProps = {
        content,
        recipients: [recipient],
        status: EmailStatus.Pending,
      };
      // 実行
      const adminEmail = AdminEmail.create(props);
      // 確認
      expect(adminEmail).toBeInstanceOf(AdminEmail);
      expect(adminEmail.title).toEqual(content.title);
      expect(adminEmail.body).toEqual(content.body);
      expect(adminEmail.recipientEmails[0]).toEqual(recipient.email);
      expect(adminEmail.status).toEqual(EmailStatus.Pending);
    });

    test('- Failed create instance with wrong status \n', () => {
      // 準備
      const content = AdminEmailContent.join({ name: { value: "Test Participant" } } as any);
      const recipient = Administrator.create({ email: Email.create("test@example.com") });
      const props: AdminEmailProps = {
        content,
        recipients: [recipient],
        status: EmailStatus.Sent, // Wrong status
      };
      // 実行・確認
      expect(() => AdminEmail.create(props)).toThrow(EntityError);
    });
  });

  describe('## restore\n', () => {
    test('- Success create instance \n', () => {
      // 準備
      const id = AdminEmailId.create();
      const content = AdminEmailContent.join({ name: { value: "Test Participant" } } as any);
      const recipient = Administrator.create({ email: Email.create("test@example.com") });
      const props: AdminEmailProps = {
        content,
        recipients: [recipient],
        status: EmailStatus.Pending,
      };
      // 実行
      const adminEmail = AdminEmail.restore(id, props);
      // 確認
      expect(adminEmail).toBeInstanceOf(AdminEmail);
      expect(adminEmail.id).toEqual(id);
      expect(adminEmail.title).toEqual(content.title);
      expect(adminEmail.body).toEqual(content.body);
      expect(adminEmail.recipientEmails[0]).toEqual(recipient.email);
      expect(adminEmail.status).toEqual(EmailStatus.Pending);
    });
  });

  describe('## setSentDateTime\n', () => {
    test('- Success to set sent date time \n', () => {
      // 準備
      const now = new Date();
      const content = AdminEmailContent.join({ name: { value: "Test Participant" } } as any);
      const recipient = Administrator.create({ email: Email.create("test@example.com") });
      const props: AdminEmailProps = {
        content,
        recipients: [recipient],
        status: EmailStatus.Pending,
      };
      const adminEmail = AdminEmail.create(props);
      // 実行
      adminEmail.setSentDateTime(now);
      // 確認
      expect(adminEmail.sentDateTime).toEqual(now);
    });
  });

  describe('## status\n', () => {
    test('- Success to change status \n', () => {
      // 準備
      const content = AdminEmailContent.join({ name: { value: "Test Participant" } } as any);
      const recipient = Administrator.create({ email: Email.create("test@example.com") });
      const props: AdminEmailProps = {
        content,
        recipients: [recipient],
        status: EmailStatus.Pending,
      };
      const adminEmail = AdminEmail.create(props);
      // 実行
      adminEmail.setStatus(EmailStatus.Sent);
      // 確認
      expect(adminEmail.status).toEqual(EmailStatus.Sent);
    });

    test('- Failed to change status from Sent \n', () => {
      // 準備
      const id = AdminEmailId.create();
      const content = AdminEmailContent.join({ name: { value: "Test Participant" } } as any);
      const recipient = Administrator.create({ email: Email.create("test@example.com") });
      const props: AdminEmailProps = {
        content,
        recipients: [recipient],
        status: EmailStatus.Sent,
      };
      const adminEmail = AdminEmail.restore(id, props);
      // 実行・確認
      expect(() => adminEmail.setStatus(EmailStatus.Sending)).toThrow(EntityError);
    });
  });

  describe('## setErrorMessage\n', () => {
    test('- Success to set error message \n', () => {
      // 準備
      const id = AdminEmailId.create();
      const errorMessage = "Error sending email";
      const content = AdminEmailContent.join({ name: { value: "Test Participant" } } as any);
      const recipient = Administrator.create({ email: Email.create("test@example.com") });
      const props: AdminEmailProps = {
        content,
        recipients: [recipient],
        status: EmailStatus.Error,
      };
      const adminEmail = AdminEmail.restore(id, props);
      // 実行
      adminEmail.setErrorMessage(errorMessage);
      // 確認
      expect(adminEmail.errorMessage).toEqual(errorMessage);
    });

    test('- Failed to set error message \n', () => {
      // 準備
      const id = AdminEmailId.create();
      const content = AdminEmailContent.join({ name: { value: "Test Participant" } } as any);
      const recipient = Administrator.create({ email: Email.create("test@example.com") });
      const props: AdminEmailProps = {
        content,
        recipients: [recipient],
        status: EmailStatus.Sent, // Intentionally setting a status that is not Error to test failure
      };
      const adminEmail = AdminEmail.restore(id, props);
      // 実行・確認
      expect(() => adminEmail.setErrorMessage("Network Error")).toThrow(EntityError);
    });
  });
});
