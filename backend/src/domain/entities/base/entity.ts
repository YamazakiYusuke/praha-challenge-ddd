
export abstract class Entity<I, P> {
  private _id: I;
  private _props: P;

  constructor(id: I, props: P) {
    this._id = id;
    this._props = props;
  }

  protected setProps(newProps: P) {
    this._props = newProps;
  }

  public get id(): I {
    return this._id;
  }

  public get props(): P {
    return this._props;
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Entity)) return false;
    return this._id == other._id
  }
}