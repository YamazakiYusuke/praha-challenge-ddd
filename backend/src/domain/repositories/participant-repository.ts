import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { Participant } from "../entities/participant";

export class ParticipantWithAssignments {
  constructor(
    readonly participant: Participant,
    readonly assignmentProgress: AssignmentProgress[],
  ) { }
}

export interface IParticipantRepository {
  getAll(): Promise<Participant[]>
  getAllWithAssignments(): Promise<ParticipantWithAssignments[]>
  save(participant: Participant, transaction?: any): Promise<void>
}
