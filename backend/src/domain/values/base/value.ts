export abstract class Value<T> {
  protected props: T;
  constructor(props: T) {
    this.props = props;
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Value)) {
      return false;
    }
    return other.props == this.props;
  }
}
