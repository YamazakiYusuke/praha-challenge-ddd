import { validateProps } from "src/domain/entities/utils/validate-props";
import { EntityError } from "../errors/entity_error";
import { PairId, ParticipantId, ParticipantsId, TeamId } from "../values/id";
import { Entity } from "./base/entity";
import { Participant } from "./participant";

export class Participants extends Entity<ParticipantsId, Array<Participant>> {
  private constructor(id: ParticipantsId, props: Array<Participant>) {
    validateProps(id, props);
    super(id, props)
  }

  static create(prop: Array<Participant>): Participants | Error {
    if (prop.length < 1 || prop.length > 3) {
      throw new EntityError('Participants must consist of 1 to 3 participants');
    }
    return new Participants(ParticipantsId.create(), prop);
  }

  static restore(id: ParticipantsId, prop: Array<Participant>): Participants {
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

  public getByIndex(i: number): Participant | undefined {
    return this.value[i] as Participant;
  }

  public append(teamId: TeamId, pairId: PairId, participant: Participant): void | Error {
    this.checkParticipantNotExists(participant.getId)
    participant.changeEnrollmentStatusToEnrolled(teamId, pairId);
    this.props = [...this.value, participant];
  }

  public remove(participant: Participant): Participant | Error {
    this.checkParticipantExists(participant.getId)
    this.props = this.value.filter(p => !p.getId.isEqual(participant.getId));
    participant.deleteTeamIdPairId();
    return participant;
  }

  public changeParticipantEnrollmentStatusToEnrolled(teamId: TeamId, pairId: PairId, participantId: ParticipantId): void | Error {
    this.checkParticipantExists(participantId)
    this.getParticipant(participantId).changeEnrollmentStatusToEnrolled(teamId, pairId);
  }

  public changeParticipantEnrollmentStatusToOnLeave(participantId: ParticipantId): void | Error {
    this.checkParticipantExists(participantId)
    this.getParticipant(participantId).changeEnrollmentStatusToOnLeave();
  }

  public changeParticipantEnrollmentStatusToWithDrawn(participantId: ParticipantId): void | Error {
    this.checkParticipantExists(participantId)
    this.getParticipant(participantId).changeEnrollmentStatusToWithDrawn();
  }

  private checkParticipantExists(participantId: ParticipantId): void | Error {
    const hasParticipant = this.value.some(p => p.getId.isEqual(participantId));
    if (!hasParticipant) {
      throw new EntityError(`participantId: ${participantId}は存在しません`);
    }
  }

  private checkParticipantNotExists(participantId: ParticipantId): void | Error {
    const hasParticipant = this.value.some(p => p.getId.isEqual(participantId));
    if (hasParticipant) {
      throw new EntityError(`participantId: ${participantId}は既に存在します`);
    }
  }

  private getParticipant(participantId: ParticipantId): Participant {
    const result = this.value.find(p => p.getId.isEqual(participantId));
    if (result === undefined) throw new EntityError('参加者ではありません');
    return result;
  }
}
