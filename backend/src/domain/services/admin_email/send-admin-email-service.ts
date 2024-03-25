import { Inject, Injectable } from "@nestjs/common";
import { AdminEmail } from "src/domain/entities/admin-email";
import { ISendMailRepository } from "src/domain/repositories/mail-sender-repository";
import { EmailStatus } from "src/util/enums";

export interface ISendAdminEmailService {
  execute(adminEmail: AdminEmail): Promise<void>;
}

@Injectable()
export class SendAdminEmailService implements ISendAdminEmailService {
  constructor(
    @Inject('ISendMailRepository')
    private readonly sendMailRepository: ISendMailRepository
  ) { }

  async execute(adminEmail: AdminEmail): Promise<void> {
    try {
      adminEmail.setStatus(EmailStatus.Sending);
      await this.sendMailRepository.send(adminEmail);
      adminEmail.setSentDateTime(new Date());
      adminEmail.setStatus(EmailStatus.Sent);
    } catch (error: any) {
      adminEmail.setErrorMessage(error.message);
      adminEmail.setStatus(EmailStatus.Error);
    } finally {
      // TODO: adminEmail　永続化
    }
  }
}