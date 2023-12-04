import { createRandomIdString } from "src/util/random";
import { Value } from "./value";

export class Id extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(): Id {
    let id = createRandomIdString();
    return new Id(id);
  }

  static restore(id: string): Id {
    return new Id(id);
  }

  public get value(): string {
    return this.props
  }
}

