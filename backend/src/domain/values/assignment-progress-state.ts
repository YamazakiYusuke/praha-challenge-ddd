import { AssignmentProgressStateValue } from "src/util/enums";
import { Value } from "./base/value";

export class AssignmentProgressState extends Value<number> {
  private constructor(value: number) {
    super(value)
  }

  static create(value: AssignmentProgressStateValue): AssignmentProgressState | Error {
    return new AssignmentProgressState(value);
  }

  static restore(value: AssignmentProgressStateValue): AssignmentProgressState {
    return new AssignmentProgressState(value);
  }

  public get value(): number {
    return this.props
  }

  public get isCompleted() {
    return this.props === AssignmentProgressStateValue.Completed;
  }
}

