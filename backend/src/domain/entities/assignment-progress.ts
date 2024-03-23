import { EntityError } from "../errors/entity_error";
import { AssignmentProgressState } from "../values/assignment-progress-state";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface AssignmentProgressProps {
  assignmentId: AssignmentId;
  participantId: ParticipantId;
  assignmentProgressState: AssignmentProgressState;
}

export class AssignmentProgress extends Entity<AssignmentProgressId, AssignmentProgressProps> {

  private constructor(id: AssignmentProgressId, props: AssignmentProgressProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AssignmentProgressProps): AssignmentProgress {
    return new AssignmentProgress(AssignmentProgressId.create(), props)
  }

  static restore(id: AssignmentProgressId, props: AssignmentProgressProps): AssignmentProgress {
    return new AssignmentProgress(id, props)
  }

  public get assignmentId(): AssignmentId {
    return this.props.assignmentId;
  }

  public get participantId(): ParticipantId {
    return this.props.participantId;
  }

  public get assignmentProgressState(): AssignmentProgressState {
    return this.props.assignmentProgressState;
  }

  public changeAssignmentProgressState(newState: AssignmentProgressState) {
    if (this.assignmentProgressState.isCompleted) {
      throw new EntityError("Cannot change state, assignment already completed");
    }
    this.props.assignmentProgressState = newState;
  }
}
