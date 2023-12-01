import { Value } from "./value";

export class Name extends Value {
  readonly value: string;

  private constructor(value: string) {
    super()
    this.value = value
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

  public isEqual(other: any): boolean {
    if (!(other instanceof Name)) {
      return false;
    }
    return this.value === other.value;
  }
}

