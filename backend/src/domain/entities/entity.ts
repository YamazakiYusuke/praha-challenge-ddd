import { Id } from "../values/id";

export abstract class Entity {
  protected id: Id;

  constructor(id: Id) {
    this.id = id;
  }

  public get getId(): Id {
    return this.id;
  }
  
  public isEqual(other: any): boolean {
    if (!(other instanceof Entity)) return false;
    return this.id == other.id
  }
}