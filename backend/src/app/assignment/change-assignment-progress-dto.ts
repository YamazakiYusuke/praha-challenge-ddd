import { AssignmentProgress } from "src/domain/entities/assignment-progress";

export class AssignmentProgressDTO {
  public readonly assignmentId: string;
  public readonly participantId: string;
  public readonly assignmentProgressState: string;
  public constructor(entity: AssignmentProgress) {
    this.assignmentId = entity.assignmentId.value;
    this.participantId = entity.participantId.value;
    this.assignmentProgressState = entity.assignmentProgressState.value;
  }
}