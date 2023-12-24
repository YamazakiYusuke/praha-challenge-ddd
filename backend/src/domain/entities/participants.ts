import { EntityError } from "../errors/entity_error";
import { Id } from "../values/id";
import { Entity } from "./base/entity";
import { Participant } from "./participant";

export class Participants extends Entity<Array<Participant>> {
  private constructor(id: Id, prop: Array<Participant>) {
    super(id, prop)
  }

  static create(prop: Array<Participant>): Participants | Error {
    if (prop.length < 1 || prop.length > 3) {
      throw new EntityError('Participants must consist of 1 to 3 participants');
    }
    return new Participants(Id.create(), prop);
  }

  static restore(id: Id, prop: Array<Participant>): Participants {
    return new Participants(id, prop);
  }

  public get value(): Array<Participant> {
    return [...this.props]
  }

  public get length(): number {
    return this.value.length;
  }

  public get last(): Participant {
    return this.value[this.value.length - 1] as Participant;
  }

  public getByIndex(i: number): Participant {
    return this.value[i] as Participant;
  }

  public append(pairId: Id, teamId: Id, participant: Participant): void | Error {
    if (this.hasParticipant(participant)) {
      throw new EntityError(`参加者${participant}は既にPairのメンバーです`);
    }
    participant.changeEnrollmentStatusToEnrolled(pairId, teamId);
    this.props = [...this.value, participant];
  }

  public remove(participant: Participant): void | Error {
    if (!this.hasParticipant(participant)) {
      throw new EntityError(`参加者${participant}はPairのメンバーではありません`);
    }
    participant.deleteTeamIdPairId();
    this.props = this.value.filter(p => !p.getId.isEqual(participant.getId));
  }

  public changeParticipantEnrollmentStatusToEnrolled(pairId: Id, teamId: Id, participant: Participant): void | Error {
    if (!this.hasParticipant(participant)) {
      throw new EntityError(`参加者${participant}はPairのメンバーではありません`);
    }
    this.getParticipant(participant).changeEnrollmentStatusToEnrolled(pairId, teamId);
  }

  public changeParticipantEnrollmentStatusToOnLeave(participant: Participant): void | Error {
    if (!this.hasParticipant(participant)) {
      throw new EntityError(`参加者${participant}はPairのメンバーではありません`);
    }
    this.getParticipant(participant).changeEnrollmentStatusToOnLeave();
  }

  public changeParticipantEnrollmentStatusToWithDrawn(participant: Participant): void | Error {
    if (!this.hasParticipant(participant)) {
      throw new EntityError(`参加者${participant}はPairのメンバーではありません`);
    }
    this.getParticipant(participant).changeEnrollmentStatusToWithDrawn();
  }

  private hasParticipant(participant: Participant): boolean {
    return this.value.includes(participant);
  }

  private getParticipant(participant: Participant): Participant {
    const result = this.value.find(p => p.getId.isEqual(participant.getId));
    if (result === undefined) throw new EntityError('参加者ではありません');
    return result;
  }
}
