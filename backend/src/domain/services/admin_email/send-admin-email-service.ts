import { Inject, Injectable } from "@nestjs/common";
import { AdminEmail } from "src/domain/entities/admin-email";
import { ISendAdminMailRepository } from "src/domain/repositories/send-admin-mail-repository";
import { EmailStatus } from "src/util/enums";

export interface ISendAdminEmailService {
  execute(adminEmail: AdminEmail): Promise<void>;
}

@Injectable()
export class SendAdminEmailService implements ISendAdminEmailService {
  constructor(
    @Inject('ISendAdminMailRepository')
    private readonly sendMailRepository: ISendAdminMailRepository
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