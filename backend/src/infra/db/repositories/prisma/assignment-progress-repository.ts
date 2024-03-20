import { Prisma } from "@prisma/client";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";

export class PrismaAssignmentProgressRepository implements IAssignmentProgressRepository {
  private assignmentProgresses: AssignmentProgress[] = [];

  async save(assignmentProgress: AssignmentProgress, tx?: Prisma.TransactionClient): Promise<void | Error> {
    this.assignmentProgresses.push(assignmentProgress);
    return;
  }

  async getAll(): Promise<AssignmentProgress[] | Error> {
    return this.assignmentProgresses;
  }
}
