import { Prisma, PrismaClient } from "@prisma/client";
import { Administrator } from "src/domain/entities/administrator";
import { IAdministratorRepository } from "src/domain/repositories/administrator-repository";
import { Email } from "src/domain/values/email";
import { AdministratorId } from "src/domain/values/id";

export class PrismaAdministratorRepository implements IAdministratorRepository {
  private readonly prisma = new PrismaClient();

  async save(administrator: Administrator, tx?: Prisma.TransactionClient): Promise<void | Error> {
    const prismaClient = tx ?? this.prisma;
    await prismaClient.administrator.upsert({
      where: {
        id: administrator.id.value,
      },
      update: {
        email: administrator.email.value,
      },
      create: {
        id: administrator.id.value,
        email: administrator.email.value,
      }
    });
  }

  async getAll(): Promise<Administrator[] | Error> {
    const rowData = await this.prisma.administrator.findMany();
    return rowData.map(data => {
      return Administrator.restore(
        AdministratorId.restore(data.id),
        {
          email: Email.restore(data.email),
        }
      );
    });
  }
}
