import { Value } from "./base/value";
import { Participant } from "../entities/participant";
import { ValueCreationError } from "../errors/value_creation_error";

export class Participants extends Value<Array<Participant>> {
  private constructor(value: Array<Participant>) {
    super(value)
  }

  static create(value: Array<Participant>): Participants | ValueCreationError {
    if (value.length < 1 || value.length > 3) {
      throw new ValueCreationError('Participants must consist of 1 to 3 participants');
    }
    return new Participants(value);
  }

  static restore(value: Array<Participant>): Participants {
    return new Participants(value);
  }

  public get value(): Array<Participant> {
    return [...this.props]
  }

  public getAppendedNewParticipant(participant: Participant): Participants | ValueCreationError {
    if (this.value.includes(participant)) {
      throw new ValueCreationError(`参加者${participant}は既にPairのメンバーです`);
    }
    const newValue = [...this.value, participant];
    return Participants.create(newValue);
  }

  public getRemovedNewParticipant(participant: Participant): Participants | ValueCreationError {
    if (!this.value.includes(participant)) {
      throw new ValueCreationError(`参加者${participant}はPairのメンバーではありません`);
    }
    const newValue = this.value.filter(p => p !== participant);
    return Participants.create(newValue);
  }

  public get length(): number {
    return this.value.length;
  }

  public get last(): Participant {
    return this.value[this.value.length - 1] as Participant;
  }
}
