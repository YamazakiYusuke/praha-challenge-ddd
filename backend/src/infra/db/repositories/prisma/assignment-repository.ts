import { Prisma } from "@prisma/client";
import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";

export class PrismaAssignmentRepository implements IAssignmentRepository {
  private assignments: Assignment[] = [];

  async save(assignment: Assignment, tx?: Prisma.TransactionClient): Promise<void | Error> {
    this.assignments.push(assignment);
    return;
  }

  async getAll(): Promise<Assignment[] | Error> {
    return this.assignments;
  }
}
