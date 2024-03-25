import { AdminEmail } from "src/domain/entities/admin-email";

export interface ISendAdminMailRepository {
  send(mail: AdminEmail): Promise<void>;
}
