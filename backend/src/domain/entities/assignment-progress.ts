import { AssignmentProgressStateValue } from "src/util/enums";
import { EntityError } from "../errors/entity_error";
import { AssignmentId, AssignmentProgressId, ParticipantId } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface AssignmentProgressProps {
  readonly assignmentId: AssignmentId;
  readonly participantId: ParticipantId;
  readonly assignmentProgressState: AssignmentProgressStateValue;
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

  public get assignmentProgressState(): AssignmentProgressStateValue {
    return this.props.assignmentProgressState;
  }

  public changeAssignmentProgressState(newState: AssignmentProgressStateValue) {
    if (this.assignmentProgressState === AssignmentProgressStateValue.Completed) {
      throw new EntityError("Cannot change state, assignment already completed");
    }
    const newProps = { ...this.props, assignmentProgressState: newState };
    this.setProps(newProps);
  }
}
