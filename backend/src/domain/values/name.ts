import { ValueCreationError } from "../errors/value_creation_error";
import { Value } from "./base/value";

// 色々なContextで使用されている。HumanName CategoryNameなど
// TODO: 別々の値オブジェクトにする
export class Name extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string): Name | ValueCreationError {
    if (!value || value.trim() === '') {
      throw new ValueCreationError('Value cannot be empty');
    }
    return new Name(value);
  }

  static restore(value: string): Name {
    return new Name(value);
  }

  public get value(): string {
    return this.props
  }
}

