import { Prisma, PrismaClient } from "@prisma/client";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { Participant } from "src/domain/entities/participant";
import { IParticipantRepository, ParticipantWithAssignments } from "src/domain/repositories/participant-repository";
import { Email } from "src/domain/values/email";
import { AssignmentId, AssignmentProgressId, PairId, ParticipantId, TeamId } from "src/domain/values/id";
import { PersonName } from "src/domain/values/name";
import { restoreAssignmentProgressStateValue, restoreEnrollmentStatusValue } from "src/util/enums";

export class PrismaParticipantRepository implements IParticipantRepository {
  private readonly prisma = new PrismaClient();

  async save(participant: Participant, transaction?: Prisma.TransactionClient): Promise<void> {
    const prismaClient = transaction ?? this.prisma;

    await prismaClient.participant.create({
      data: {
        id: participant.id.value,
        name: participant.name.value,
        email: participant.email.value,
        pairId: participant.pairId?.value,
        teamId: participant.teamId?.value,
        enrollmentStatus: participant.enrollmentStatus,
      },
    });
  }

  async getAll(): Promise<Participant[]> {
    const participants = await this.prisma.participant.findMany();

    return participants.map(participant =>
      Participant.restore(
        ParticipantId.restore(participant.id),
        {
          name: PersonName.restore(participant.name),
          email: Email.restore(participant.email),
          pairId: participant.pairId ? PairId.restore(participant.pairId) : undefined,
          teamId: participant.teamId ? TeamId.restore(participant.teamId) : undefined,
          enrollmentStatus: restoreEnrollmentStatusValue(participant.enrollmentStatus),
        }
      )
    );
  }

  async getAllWithAssignments(): Promise<ParticipantWithAssignments[]> {
    const participants = await this.prisma.participant.findMany({
      include: {
        progresses: true,
      },
    });

    return participants.map(participant =>
      new ParticipantWithAssignments(
        Participant.restore(
          ParticipantId.restore(participant.id),
          {
            name: PersonName.restore(participant.name),
            email: Email.restore(participant.email),
            pairId: participant.pairId ? PairId.restore(participant.pairId) : undefined,
            teamId: participant.teamId ? TeamId.restore(participant.teamId) : undefined,
            enrollmentStatus: restoreEnrollmentStatusValue(participant.enrollmentStatus),
          }
        ),
        participant.progresses.map(progress =>
          AssignmentProgress.restore(
            AssignmentProgressId.restore(progress.id),
            {
              assignmentId: AssignmentId.restore(progress.assignmentId),
              participantId: ParticipantId.restore(progress.participantId),
              assignmentProgressState: restoreAssignmentProgressStateValue(progress.state),
            }
          )
        ),
      )
    );
  }
}
