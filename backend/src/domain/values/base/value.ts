export abstract class Value<T> {
  private _props: T;
  constructor(props: T) {
    this._props = props;
  }

  protected get props(): T {
    return this._props;
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Value)) {
      return false;
    }
    return other.props == this._props;
  }
}
