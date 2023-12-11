import { ValueCreationError } from "../errors/value_creation_error";
import { Value } from "./base/value";

export class EnrollmentStatus extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string): EnrollmentStatus | ValueCreationError {
    if (!(value in EnrollmentStatusValue)) {
      throw new ValueCreationError('Invalid value');
    }
    return new EnrollmentStatus(value);
  }

  static restore(value: string): EnrollmentStatus {
    return new EnrollmentStatus(value);
  }

  public get value(): string {
    return this.props
  }
}

