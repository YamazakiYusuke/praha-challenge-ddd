import { Value } from "./value";

export class Name extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('Value cannot be empty');
    }
    return new Name(value);
  }

  static restore(value: string) {
    return new Name(value);
  }

  public get value(): string {
    return this.props
  }
}

