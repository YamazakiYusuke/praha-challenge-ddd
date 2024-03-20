import { Prisma } from "@prisma/client";
import { AssignmentProgress } from "../entities/assignment-progress";
import { RepositoryError } from "../errors/repository_error";

export interface IAssignmentProgressRepository {
  save(assignmentProgress: AssignmentProgress, tx?: Prisma.TransactionClient): Promise<void | Error>
  getAll(): Promise<AssignmentProgress[] | RepositoryError>
}
