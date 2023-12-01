import { createRandomIdString } from "src/util/random";
import { Value } from "./value";

export class Category extends Value {
  readonly value: string;

  private constructor(value: string) {
    super()
    this.value = value
  }

  static create(value: string) {
    return new Category(value);
  }

  static restore(value: string) {
    return new Category(value);
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Category)) {
      return false;
    }
    return this.value === other.value;
  }
}

