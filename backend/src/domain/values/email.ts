import { Value } from "./value";

export class Email extends Value {
  readonly value: string;
  private static readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private constructor(value: string) {
    super()
    this.value = value
  }

  static create(value: string) {
    if (!value || !Email.emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }
    return new Email(value);
  }

  static restore(value: string) {
    return new Email(value);
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Email)) {
      return false;
    }
    return this.value === other.value;
  }
}

