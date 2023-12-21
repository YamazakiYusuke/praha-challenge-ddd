import { EntityCreationError } from "../errors/entity_creation_error";
import { EntityModificationError } from "../errors/entity_modification_error";
import { ValueCreationError } from "../errors/value_creation_error";
import { Id } from "../values/id"
import { Name } from "../values/name";
import { Participants } from "../values/participants";
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

  static create(props: PairProps): Pair | EntityCreationError {
    return new Pair(Id.create(), props)
  }

  static restore(id: Id, props: PairProps): Pair {
    return new Pair(id, props)
  }

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
    return this.props.participants.last;
  }

  public appendParticipant(participant: Participant): void | ValueCreationError {
    const newParticipants = this.props.participants.getAppendedNewParticipant(participant) as Participants;
    this.props.participants = newParticipants;
  }

  public removeParticipant(participant: Participant): void | ValueCreationError {
    const newParticipants = this.props.participants.getRemovedNewParticipant(participant) as Participants;
    this.props.participants = newParticipants;
  }

  public get participantsLength(): number {
    return this.props.participants.length;
  }
}
