import { Prisma, PrismaClient } from "@prisma/client";
import { AdminEmail } from "src/domain/entities/admin-email";
import { IAdminMailRepository } from "src/domain/repositories/admin-mail-repository";

export class PrismaAdminMailRepository implements IAdminMailRepository {
  private readonly prisma = new PrismaClient();

  async save(mail: AdminEmail, transaction?: Prisma.TransactionClient): Promise<void> {
    const prismaClient = transaction ?? this.prisma;
    await prismaClient.adminEmail.upsert({
      where: {
        id: mail.id.value,
      },
      update: {
        title: mail.title,
        body: mail.body,
        sentDateTime: mail.sentDateTime,
        status: mail.status,
        errorMessage: mail.errorMessage,
      },
      create: {
        id: mail.id.value,
        title: mail.title,
        body: mail.body,
        sentDateTime: mail.sentDateTime,
        status: mail.status,
        errorMessage: mail.errorMessage,
      }
    });
  }
}
