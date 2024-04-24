import { Prisma, PrismaClient } from "@prisma/client";
import { Assignment } from "src/domain/entities/assignment";
import { IAssignmentRepository } from "src/domain/repositories/assignment-repository";
import { AssignmentId, CategoryId } from "src/domain/values/ids";

export class PrismaAssignmentRepository implements IAssignmentRepository {
  private readonly prisma = new PrismaClient();

  async save(assignment: Assignment, transaction?: Prisma.TransactionClient): Promise<void> {
    const prismaClient = transaction ?? this.prisma;
    await prismaClient.assignment.upsert({
      where: { id: assignment.id.value },
      update: {
        number: assignment.number,
        title: assignment.title,
        introduction: assignment.introduction,
        content: assignment.content,
        categoryId: assignment.categoryId.value,
      },
      create: {
        id: assignment.id.value,
        number: assignment.number,
        title: assignment.title,
        introduction: assignment.introduction,
        content: assignment.content,
        categoryId: assignment.categoryId.value,
      },
    });
  }

  async getAll(): Promise<Assignment[]> {
    const assignments = await this.prisma.assignment.findMany();
    return assignments.map(assignment => Assignment.restore(
      AssignmentId.restore(assignment.id),
      {
        number: assignment.number,
        title: assignment.title,
        categoryId: CategoryId.restore(assignment.categoryId),
        introduction: assignment.introduction,
        content: assignment.content,
      }
    ));
  }
}
