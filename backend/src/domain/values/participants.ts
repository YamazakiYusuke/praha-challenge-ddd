import { Value } from "./base/value";
import { Participant } from "../entities/participant";
import { ValueError } from "../errors/value_error";

export class Participants extends Value<Array<Participant>> {
  private constructor(value: Array<Participant>) {
    super(value)
  }

  static create(value: Array<Participant>): Participants | Error {
    if (value.length < 1 || value.length > 3) {
      throw new ValueError('Participants must consist of 1 to 3 participants');
    }
    return new Participants(value);
  }

  static restore(value: Array<Participant>): Participants {
    return new Participants(value);
  }

  public get value(): Array<Participant> {
    return [...this.props]
  }

  public getAppendedNewParticipant(participant: Participant): Participants | Error {
    if (this.value.includes(participant)) {
      throw new ValueError(`参加者${participant}は既にPairのメンバーです`);
    }
    const newValue = [...this.value, participant];
    return Participants.create(newValue);
  }

  public getRemovedNewParticipant(participant: Participant): Participants | Error {
    if (!this.value.includes(participant)) {
      throw new ValueError(`参加者${participant}はPairのメンバーではありません`);
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
