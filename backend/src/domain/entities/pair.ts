import { PairName } from "src/domain/values/name";
import { PairId, ParticipantId, TeamId } from "../values/id";
import { Entity } from "./base/entity";
import { Participant } from "./participant";
import { Participants } from "./participants";
import { validateProps } from "./utils/validate-props";

export interface PairProps {
  teamId: TeamId;
  name: PairName;
  participants: Participants;
}

export class Pair extends Entity<PairId, PairProps> {

  private constructor(id: PairId, props: PairProps) {
    validateProps(id, props);
    super(id, props)
  }
  /// Factory
  static create(props: PairProps): Pair | Error {
    const pair = new Pair(PairId.create(), props);
    for (let i = 0; i < pair.participants.length; i++) {
      const participant = pair.participants.getByIndex(i) as Participant;
      pair.changeParticipantEnrollmentStatusToEnrolled(participant.id);
    }
    return pair;
  }

  static restore(id: PairId, props: PairProps): Pair {
    return new Pair(id, props)
  }

  /// Getter
  public get teamId(): TeamId {
    return this.props.teamId;
  }

  public get name(): PairName {
    return this.props.name;
  }

  public get participants(): Participants {
    return this.props.participants;
  }

  public get lastParticipant(): Participant {
    return this.participants.last;
  }

  public get participantsLength(): number {
    return this.participants.length;
  }

  public get hasValidNumberOfParticipants(): boolean {
    return this.participants.isValidLength;
  }

  public get hasExceededMaxParticipants(): boolean {
    return this.participants.isAboveMaxNumber;
  }

  public get hasInsufficientMinParticipants(): boolean {
    return this.participants.isBelowMinNumber;
  }

  /// Method
  /**
   * Pairに所属している参加者を在籍状態にする
   * @param participant 
   */
  public appendParticipant(participant: Participant): void | Error {
    this.participants.append(this.teamId, this.id, participant);
    this.changeParticipantEnrollmentStatusToEnrolled(participant.id);
  }

  /**
   * Pairに所属している参加者を取り除く
   * @param participant 
   */
  public removeParticipant(participant: Participant): void | Error {
    this.participants.remove(participant);
  }

  /**
   * Pairに所属している参加者を在籍状態にする
   * @param participantId 
   */
  private changeParticipantEnrollmentStatusToEnrolled(participantId: ParticipantId): void | Error {
    this.participants.changeParticipantEnrollmentStatusToEnrolled(this.teamId, this.id, participantId);
  }

  /**
   * Pairに所属している参加者を休会させる
   * @param participant 
   */
  public changeParticipantEnrollmentStatusToOnLeave(participant: Participant): void | Error {
    this.participants.changeParticipantEnrollmentStatusToOnLeave(participant.id);
    this.removeParticipant(participant);
  }

  /**
   * Pairに所属している参加者を退会させる
   * @param participant 
   */
  public changeParticipantEnrollmentStatusToWithDrawn(participant: Participant): void | Error {
    this.participants.changeParticipantEnrollmentStatusToWithDrawn(participant.id);
    this.removeParticipant(participant);
  }
}
