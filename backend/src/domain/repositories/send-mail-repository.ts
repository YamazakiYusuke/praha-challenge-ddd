import { AdminEmail } from "src/domain/entities/admin-email";

export interface ISendMailRepository {
  send(mail: AdminEmail): Promise<void>;
}
