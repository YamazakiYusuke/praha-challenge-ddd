import { GetAllAdministratorsQuery } from "src/domain/commands/administrator/get-all-administrator-query";
import { AdminEmail } from "src/domain/entities/admin-email";
import { AdminEmailContent } from "src/domain/values/admin-email-content";
import { EmailStatus } from "src/util/enums";
import { container } from "tsyringe";

export class CreateAdminEmailService {
  constructor(
    private readonly getAllAdministratorsQuery: GetAllAdministratorsQuery = container.resolve(GetAllAdministratorsQuery),
  ) { }

  async execute(content: AdminEmailContent): Promise<AdminEmail> {
    const allAdmins = await this.getAllAdministratorsQuery.execute();
    return AdminEmail.create({
      content: content,
      recipients: allAdmins,
      status: EmailStatus.Pending,
    });
  }
}