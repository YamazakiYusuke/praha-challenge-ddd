import { GetAllAdministratorsQuery } from "src/domain/commands/administrator/get-all-administrator-query";
import { AdminEmail } from "src/domain/entities/admin-email";
import { EmailStatus } from "src/domain/util/enums";
import { AdminEmailContent } from "src/domain/values/admin-email-content";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateAdminEmailService {
  constructor(
    @inject(GetAllAdministratorsQuery)
    private readonly getAllAdministratorsQuery: GetAllAdministratorsQuery,
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