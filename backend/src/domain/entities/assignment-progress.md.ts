import { AssignmentProgressState } from "../values/assignment-progress-state";
import { Id } from "../values/id"
import { Entity } from "./entity"

export interface AssignmentProgressProps {
  assignmentId: Id;
  participantId: Id;
  assignmentProgressState: AssignmentProgressState;
}
/**
 * **sample code**
 * ```typescript
 * const props = AssignmentProgressProps {
 *  email: Email.create('admin@example.com'),
 * }
 * const AssignmentProgress = AssignmentProgress.create(props);
 * ```
 */
export class AssignmentProgress extends Entity<AssignmentProgressProps> {

  private constructor(id: Id, props: AssignmentProgressProps) {
    super(id, props)
  }

  static create(props: AssignmentProgressProps): AssignmentProgress | Error {
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
}
