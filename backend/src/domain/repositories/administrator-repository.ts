import { Prisma } from "@prisma/client";
import { Administrator } from "../entities/administrator";

export interface IAdministratorRepository {
  save(administrator: Administrator, tx?: Prisma.TransactionClient): Promise<void | Error>
  getAll(): Promise<Administrator[] | Error>
}
