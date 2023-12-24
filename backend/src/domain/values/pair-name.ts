import { ValueError } from "../errors/value_error";
import { Value } from "./base/value";

export class PairName extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string): PairName | Error {
    if (!value || value.trim() === '') {
      throw new ValueError('Value cannot be empty');
    }
    return new PairName(value);
  }

  static restore(value: string): PairName {
    return new PairName(value);
  }

  public get value(): string {
    return this.props
  }
}

