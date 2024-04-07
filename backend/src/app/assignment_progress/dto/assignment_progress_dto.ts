import { Dto } from "src/app/base/dto";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/ids";

export class AssignmentProgressDto extends Dto<AssignmentProgress> {
  public readonly id: string;
  public readonly assignmentId: string;
  public readonly participantId: string;
  public readonly assignmentProgressState: number;

  constructor(assignmentProgress: AssignmentProgress) {
    super();
    this.id = assignmentProgress.id.value;
    this.assignmentId = assignmentProgress.assignmentId.value;
    this.participantId = assignmentProgress.participantId.value;
    this.assignmentProgressState = assignmentProgress.assignmentProgressState;
  }

  get toEntity(): AssignmentProgress {
    const assignmentProgressId = AssignmentProgressId.restore(this.id);
    const assignmentId = AssignmentId.restore(this.assignmentId);
    const participantId = ParticipantId.restore(this.participantId);
    const assignmentProgressState = this.assignmentProgressState;

    return AssignmentProgress.restore(assignmentProgressId, {
      assignmentId,
      participantId,
      assignmentProgressState,
    });
  }
}


