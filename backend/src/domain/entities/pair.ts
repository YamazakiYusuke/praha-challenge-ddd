import { EntityError } from "../errors/entity_error";
import { Id } from "../values/id"
import { Name } from "../values/name";
import { Participants } from "./participants";
import { Entity } from "./base/entity"
import { Participant } from "./participant";
import { validateProps } from "./utils/validate-props";

export interface PairProps {
  teamId: Id;
  name: Name;
  participants: Participants;
}
/**
 * **sample code**
 * ```typescript
 * const props: PairProps = {
 *  teamId: Id.create(),
 *  name: Name.create('Pair Name'),
 *  participants: Participants.create([participant, participant]),
 * }
 * const pair = Pair.create(props);
 * ```
 */
export class Pair extends Entity<PairProps> {

  private constructor(id: Id, props: PairProps) {
    validateProps(id, props);
    super(id, props)
  }
  /// Factory
  static create(props: PairProps): Pair | Error {
    const pair = new Pair(Id.create(), props);
    for (let i = 0; i < pair.participants.length; i++) {
      const participant = pair.participants.getByIndex(i);
      pair.changeParticipantEnrollmentStatusToEnrolled(participant);
    }
    return pair;
  }

  static restore(id: Id, props: PairProps): Pair {
    return new Pair(id, props)
  }

  /// Getter
  public get teamId(): Id {
    return this.props.teamId;
  }

  public get name(): Name {
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
    this.participants.appendParticipant(participant);
    this.changeParticipantEnrollmentStatusToEnrolled(participant);
  }

  public removeParticipant(participant: Participant): void | Error {
    this.participants.removeParticipant(participant);
  }

  private changeParticipantEnrollmentStatusToEnrolled(participant: Participant): void | Error {
    this.participants.changeParticipantEnrollmentStatusToEnrolled(this.getId, this.teamId, participant);
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
