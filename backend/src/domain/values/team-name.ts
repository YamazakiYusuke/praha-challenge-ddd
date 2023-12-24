import { ValueError } from "../errors/value_error";
import { Value } from "./base/value";

export class TeamName extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string): TeamName | Error {
    if (!value || value.trim() === '') {
      throw new ValueError('Value cannot be empty');
    }
    return new TeamName(value);
  }

  static restore(value: string): TeamName {
    return new TeamName(value);
  }

  public get value(): string {
    return this.props
  }
}

