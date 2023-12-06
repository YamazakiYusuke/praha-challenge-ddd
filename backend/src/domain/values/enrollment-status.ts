import { Value } from "./base/value";

export class EnrollmentStatus extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string): EnrollmentStatus | Error {
    if (!(value in EnrollmentStatusValue)) {
      console.error('Invalid value');
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

