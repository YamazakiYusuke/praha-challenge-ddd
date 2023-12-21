import { ValueError } from "../errors/value_error";
import { Value } from "./base/value";

export class AssignmentProgressState extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string): AssignmentProgressState | Error {
    if (!(value in AssignmentProgressStateValue)) {
      throw new ValueError('Invalid value');
    }
    return new AssignmentProgressState(value);
  }

  static restore(value: string): AssignmentProgressState {
    return new AssignmentProgressState(value);
  }

  public get value(): string {
    return this.props
  }
}

