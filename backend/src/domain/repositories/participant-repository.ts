import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { Participant } from "../entities/participant";
import { Prisma } from "@prisma/client";

export class ParticipantWithAssignments {
  constructor(
    readonly participant: Participant,
    readonly assignmentProgress: AssignmentProgress[],
  ) { }
}

export interface IParticipantRepository {
  getAll(): Promise<Participant[] | Error>
  getAllWithAssignments(): Promise<ParticipantWithAssignments[] | Error>
  save(participant: Participant, tx?: Prisma.TransactionClient): Promise<void | Error>
}
