import { Prisma } from "@prisma/client";
import { Pair } from "../entities/pair";

export interface IPairRepository {
  save(pairs: Pair, tx?: Prisma.TransactionClient): Promise<void | Error>
  getAll(): Promise<Pair[] | Error>
}
