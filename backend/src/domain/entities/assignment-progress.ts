import { EntityError } from "../errors/entity_error";
import { AssignmentProgressState } from "../values/assignment-progress-state";
import { Id } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface AssignmentProgressProps {
  assignmentId: Id;
  participantId: Id;
  assignmentProgressState: AssignmentProgressState;
}

export class AssignmentProgress extends Entity<AssignmentProgressProps> {

  private constructor(id: Id, props: AssignmentProgressProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AssignmentProgressProps): AssignmentProgress | Error {
    return new AssignmentProgress(Id.create(), props)
  }

  static restore(id: Id, props: AssignmentProgressProps): AssignmentProgress {
    return new AssignmentProgress(id, props)
  }

  public get assignmentId(): Id {
    return this.props.assignmentId;
  }

  public get participantId(): Id {
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
