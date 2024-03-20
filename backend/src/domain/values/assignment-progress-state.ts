import { AssignmentProgressStateValue } from "src/util/enums";
import { Value } from "./base/value";

export class AssignmentProgressState extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: AssignmentProgressStateValue): AssignmentProgressState | Error {
    return new AssignmentProgressState(value.toString());
  }

  static restore(value: string): AssignmentProgressState {
    return new AssignmentProgressState(value);
  }

  public get value(): string {
    return this.props
  }

  public get isCompleted() {
    return this.props === AssignmentProgressStateValue.Completed.toString();
  }
}

