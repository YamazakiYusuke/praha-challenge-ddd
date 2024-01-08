import { ValueError } from "../errors/value_error";
import { Value } from "./base/value";

class Name extends Value<string> {
  protected constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new ValueError('Value cannot be empty');
    }
    super(value)
  }

  public get value(): string {
    return this.props
  }
}

export class CategoryName extends Name {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): CategoryName | Error {
    return new CategoryName(value);
  }

  static restore(value: string): CategoryName {
    return new CategoryName(value);
  }
}

export class PairName extends Name {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): PairName | Error {
    return new PairName(value);
  }

  static restore(value: string): PairName {
    return new PairName(value);
  }
}

export class PersonName extends Name {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): PersonName | Error {
    return new PersonName(value);
  }

  static restore(value: string): PersonName {
    return new PersonName(value);
  }
}

export class TeamName extends Name {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): TeamName | Error {
    return new TeamName(value);
  }

  static restore(value: string): TeamName {
    return new TeamName(value);
  }
}

