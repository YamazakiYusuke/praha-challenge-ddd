import { createRandomIdString } from "src/util/random";
import { Value } from "./value";

export class Id extends Value {
  readonly value: string;

  private constructor(value: string) {
    super()
    this.value = value
  }

  static create() {
    let id = createRandomIdString();
    return new Id(id);
  }

  static restore(id: string) {
    return new Id(id);
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Id)) {
      return false;
    }
    return this.value === other.value;
  }
}

