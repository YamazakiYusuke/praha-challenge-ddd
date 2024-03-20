import { Prisma } from "@prisma/client";
import { Assignment } from "../entities/assignment";

export interface IAssignmentRepository {
  save(assignment: Assignment, tx?: Prisma.TransactionClient): Promise<void | Error>
  getAll(): Promise<Assignment[] | Error>
}
