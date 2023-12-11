import { EntityCreationError } from "../errors/entity_creation_error";
import { AssignmentProgressState } from "../values/assignment-progress-state";
import { Id } from "../values/id"
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface AssignmentProgressProps {
  assignmentId: Id;
  participantId: Id;
  assignmentProgressState: AssignmentProgressState;
}
/**
 * **sample code**
 * ```typescript
 * const props: AssignmentProgressProps = {
 *  assignmentId: assignmentId,
 *  participantId: participantId,
 *  assignmentProgressState: AssignmentProgressState.create('InProgress'),
 * }
 * const AssignmentProgress = AssignmentProgress.create(props);
 * ```
 */
export class AssignmentProgress extends Entity<AssignmentProgressProps> {

  private constructor(id: Id, props: AssignmentProgressProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AssignmentProgressProps): AssignmentProgress | EntityCreationError {
    if (!props.assignmentId || !props.participantId || !props.assignmentProgressState) {
      return new Error("Invalid or missing properties");
    }
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

  public changeAssignmentProgressState(newState: AssignmentProgressState): void | Error {
    if (this.props.assignmentProgressState.value === AssignmentProgressStateValue.Completed) {
      throw new Error("Cannot change state, assignment already completed");
    }
    this.props.assignmentProgressState = newState;
  }
}
