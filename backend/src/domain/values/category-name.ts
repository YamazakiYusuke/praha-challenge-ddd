import { ValueError } from "../errors/value_error";
import { Value } from "./base/value";

// TODO: rename
export class CategoryName extends Value<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): CategoryName | Error {
    if (!value || value.trim() === '') {
      throw new ValueError('Value cannot be empty');
    }
    return new CategoryName(value);
  }

  static restore(value: string): CategoryName {
    return new CategoryName(value);
  }

  public get value(): string {
    return this.props;
  }
}

