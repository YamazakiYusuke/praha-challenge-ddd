import { Id } from "../values/id";

export abstract class Entity<T> {
  protected id: Id;
  protected props: T;

  constructor(id: Id, props: T) {
    this.id = id;
    this.props = props;
  }

  public get getId(): Id {
    return this.id;
  }
  
  public isEqual(other: any): boolean {
    if (!(other instanceof Entity)) return false;
    return this.id == other.id
  }
}