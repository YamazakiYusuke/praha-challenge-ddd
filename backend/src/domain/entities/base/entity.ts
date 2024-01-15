
export abstract class Entity<I, P> {
  protected _id: I;
  protected props: P;

  constructor(id: I, props: P) {
    this._id = id;
    this.props = props;
  }

  public get id(): I {
    return this._id;
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Entity)) return false;
    return this._id == other._id
  }
}