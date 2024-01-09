import { Id } from "../../values/id";

export abstract class Entity<I, P> {
  protected id: I;
  protected props: P;

  constructor(id: I, props: P) {
    this.id = id;
    this.props = props;
  }

  public get getId(): I {
    return this.id;
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Entity)) return false;
    return this.id == other.id
  }
}