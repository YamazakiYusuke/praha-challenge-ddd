import { Prisma, PrismaClient } from "@prisma/client";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/ids";

export class PrismaAssignmentProgressRepository implements IAssignmentProgressRepository {
  private readonly prisma = new PrismaClient();

  async save(assignmentProgress: AssignmentProgress, transaction?: Prisma.TransactionClient): Promise<void> {
    const prismaClient = transaction ?? this.prisma;
    await prismaClient.assignmentProgress.upsert({
      where: { id: assignmentProgress.id.value },
      update: { state: assignmentProgress.assignmentProgressState },
      create: {
        id: assignmentProgress.id.value,
        state: assignmentProgress.assignmentProgressState,
        participantId: assignmentProgress.participantId.value,
        assignmentId: assignmentProgress.assignmentId.value,
      },
    });
  }

  async getAll(): Promise<AssignmentProgress[]> {
    const progresses = await this.prisma.assignmentProgress.findMany();
    return progresses.map(progress => AssignmentProgress.restore(
      AssignmentProgressId.restore(progress.id), {
      assignmentId: AssignmentId.restore(progress.assignmentId),
      participantId: ParticipantId.restore(progress.participantId),
      assignmentProgressState: progress.state,
    }
    ));
  }
}
