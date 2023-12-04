import { Value } from "./value";

export class Category extends Value<string> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string) {
    return new Category(value);
  }

  static restore(value: string) {
    return new Category(value);
  }

  public get value(): string {
    return this.props
  }
}

