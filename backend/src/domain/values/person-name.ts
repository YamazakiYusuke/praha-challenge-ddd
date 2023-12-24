import { ValueError } from "../errors/value_error";
import { Value } from "./base/value";

// TODO: rename
export class PersonName extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string): PersonName | Error {
    if (!value || value.trim() === '') {
      throw new ValueError('Value cannot be empty');
    }
    return new PersonName(value);
  }

  static restore(value: string): PersonName {
    return new PersonName(value);
  }

  public get value(): string {
    return this.props
  }
}

