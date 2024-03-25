import { Injectable } from "@nestjs/common";
import { AdminEmail } from "src/domain/entities/admin-email";
import { ISendMailRepository } from "src/domain/repositories/send-mail-repository";

@Injectable()
export class MockSendMailRepository implements ISendMailRepository {
  async send(adminEmail: AdminEmail): Promise<void> {
    console.log(`Mock sending email to ${adminEmail.recipientEmails.map(email => email.value).join(", ")}`);
    // Simulate email sending
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.01; // 99% success rate
        if (isSuccess) {
          console.log("Mock email sent successfully.");
          resolve();
        } else {
          console.log("Mock email failed to send.");
          reject(new Error("Failed to send email due to mock error."));
        }
      }, 1000);
    });
  }
}
