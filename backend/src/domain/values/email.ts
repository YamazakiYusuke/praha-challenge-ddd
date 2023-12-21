import { ValueError } from "../errors/value_error";
import { Value } from "./base/value";

export class Email extends Value<string> {
  private static readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private constructor(value: string) {
    super(value)
  }

  static create(value: string): Email | Error {
    if (!value || !Email.emailRegex.test(value)) {
      throw new ValueError('Invalid email format');
    }
    return new Email(value);
  }

  static restore(value: string): Email {
    return new Email(value);
  }

  public get value(): string {
    return this.props
  }
}
