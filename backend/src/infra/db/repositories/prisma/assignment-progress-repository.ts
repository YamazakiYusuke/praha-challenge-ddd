import { Prisma, PrismaClient } from "@prisma/client";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { IAssignmentProgressRepository } from "src/domain/repositories/assignment-progress-repository";
import { AssignmentProgressState } from "src/domain/values/assignment-progress-state";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/id";

export class PrismaAssignmentProgressRepository implements IAssignmentProgressRepository {
  private readonly prisma = new PrismaClient();

  async save(assignmentProgress: AssignmentProgress, tx?: Prisma.TransactionClient): Promise<void | Error> {
    const prismaClient = tx ?? this.prisma;
    await prismaClient.assignmentProgress.upsert({
      where: { id: assignmentProgress.id.value },
      update: { state: assignmentProgress.assignmentProgressState.value },
      create: {
        id: assignmentProgress.id.value,
        state: assignmentProgress.assignmentProgressState.value,
        participantId: assignmentProgress.participantId.value,
        assignmentId: assignmentProgress.assignmentId.value,
      },
    });
  }

  async getAll(): Promise<AssignmentProgress[] | Error> {
    const progresses = await this.prisma.assignmentProgress.findMany();
    return progresses.map(progress => AssignmentProgress.restore(
      AssignmentProgressId.restore(progress.id), {
        assignmentId: AssignmentId.restore(progress.assignmentId),
        participantId: ParticipantId.restore(progress.participantId),
        assignmentProgressState: AssignmentProgressState.restore(progress.state),
      }
    ));
  }
}
