import { AssignmentProgress } from "src/domain/entities/assignment-progress";

export class AssignmentProgressDto {
  public readonly id: string;
  public readonly assignmentId: string;
  public readonly participantId: string;
  public readonly assignmentProgressState: number;

  constructor(assignmentProgress: AssignmentProgress) {
    this.id = assignmentProgress.id.value;
    this.assignmentId = assignmentProgress.assignmentId.value;
    this.participantId = assignmentProgress.participantId.value;
    this.assignmentProgressState = assignmentProgress.assignmentProgressState;
  }
}


