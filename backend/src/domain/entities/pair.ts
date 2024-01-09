import { PairName } from "src/domain/values/name";
import { PairId, TeamId } from "../values/id";
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
      pair.changeParticipantEnrollmentStatusToEnrolled(participant);
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

  /// Method
  public appendParticipant(participant: Participant): void | Error {
    this.participants.append(this.teamId, this.getId, participant);
    this.changeParticipantEnrollmentStatusToEnrolled(participant);
  }

  public removeParticipant(participant: Participant): void | Error {
    this.participants.remove(participant);
  }

  private changeParticipantEnrollmentStatusToEnrolled(participant: Participant): void | Error {
    this.participants.changeParticipantEnrollmentStatusToEnrolled(this.teamId, this.getId, participant);
  }

  public changeParticipantEnrollmentStatusToOnLeave(participant: Participant): void | Error {
    this.participants.changeParticipantEnrollmentStatusToOnLeave(participant);
    this.removeParticipant(participant);
  }

  public changeParticipantEnrollmentStatusToWithDrawn(participant: Participant): void | Error {
    this.participants.changeParticipantEnrollmentStatusToWithDrawn(participant);
    this.removeParticipant(participant);
  }
}
