import { AdminEmail } from "src/domain/entities/admin-email";

export interface IMailSenderRepository {
  send(mail: AdminEmail): Promise<void>;
}
