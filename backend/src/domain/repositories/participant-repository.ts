import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { Participant } from "../entities/participant";

export class ParticipantWithAssignments {
  constructor(
    readonly participant: Participant,
    readonly assignmentProgress: AssignmentProgress[],
  ) { }
}

export interface IParticipantRepository {
  getAll(): Promise<Participant[] | Error>
  getAllWithAssignments(): Promise<ParticipantWithAssignments[] | Error>
  save(participant: Participant): Promise<void | Error>
}
