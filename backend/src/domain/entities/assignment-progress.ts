import { EntityError } from "../errors/entity_error";
import { AssignmentProgressState } from "../values/assignment-progress-state";
import { AssignmentProgressId } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface AssignmentProgressProps {
  assignmentId: AssignmentProgressId;
  participantId: AssignmentProgressId;
  assignmentProgressState: AssignmentProgressState;
}

export class AssignmentProgress extends Entity<AssignmentProgressProps> {

  private constructor(id: AssignmentProgressId, props: AssignmentProgressProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AssignmentProgressProps): AssignmentProgress | Error {
    return new AssignmentProgress(AssignmentProgressId.create(), props)
  }

  static restore(id: AssignmentProgressId, props: AssignmentProgressProps): AssignmentProgress {
    return new AssignmentProgress(id, props)
  }

  public get assignmentId(): AssignmentProgressId {
    return this.props.assignmentId;
  }

  public get participantId(): AssignmentProgressId {
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
