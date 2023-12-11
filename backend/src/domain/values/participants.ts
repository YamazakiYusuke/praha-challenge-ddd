import { Value } from "./base/value";
import { Participant } from "../entities/participant";

export class Participants extends Value<Array<Participant>> {
  private constructor(value: Array<Participant>) {
    super(value)
  }

  static create(value: Array<Participant>) {
    if (value.length < 1 || value.length > 3) {
      throw new Error('Participants must consist of 1 to 3 participants');
    }
    return new Participants(value);
  }

  static restore(value: Array<Participant>) {
    return new Participants(value);
  }

  public get value(): Array<Participant> {
    return this.props
  }
}

