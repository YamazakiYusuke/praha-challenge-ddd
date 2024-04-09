import { Dto } from "src/app/base/dto";
import { AssignmentProgress } from "src/domain/entities/assignment-progress";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "src/domain/values/ids";

export class AssignmentProgressDto extends Dto<AssignmentProgress> {
  public readonly id: string;
  public readonly assignmentId: string;
  public readonly participantId: string;
  public readonly assignmentProgressState: number;

  constructor({ id, assignmentId, participantId, assignmentProgressState }: { id: string, assignmentId: string, participantId: string, assignmentProgressState: number }) {
    super();
    this.id = id;
    this.assignmentId = assignmentId;
    this.participantId = participantId;
    this.assignmentProgressState = assignmentProgressState;
  }

  static fromEntity(assignmentProgress: AssignmentProgress): AssignmentProgressDto {
    const { id, assignmentId, participantId, assignmentProgressState } = assignmentProgress;
    return new AssignmentProgressDto({ id: id.value, assignmentId: assignmentId.value, participantId: participantId.value, assignmentProgressState });
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


