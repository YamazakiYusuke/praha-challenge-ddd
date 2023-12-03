import { Value } from "./value";

export class Category extends Value<String> {
  private constructor(value: string) {
    super(value)
  }

  static create(value: string) {
    return new Category(value);
  }

  static restore(value: string) {
    return new Category(value);
  }

  public get id(): String {
    return this.props
  }
}

