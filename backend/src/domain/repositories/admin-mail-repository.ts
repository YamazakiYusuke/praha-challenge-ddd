import { AdminEmail } from "src/domain/entities/admin-email";

export interface IAdminMailRepository {
  save(mail: AdminEmail, transaction?: any): Promise<void>
}
