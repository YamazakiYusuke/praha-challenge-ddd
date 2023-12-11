import { EntityCreationError } from "../errors/entity_creation_error";
import { EntityModificationError } from "../errors/entity_modification_error";
import { Id } from "../values/id"
import { Name } from "../values/name";
import { Participants } from "../values/participants";
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface PairProps {
  name: Name;
  participants: Participants;
}
/**
 * **sample code**
 * ```typescript
 * const props: PairProps = {
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

  public get name(): Name {
    return this.props.name;
  }

  public get participants(): Participants {
    return this.props.participants;
  }

  public changeMember(newParticipants: Participants): void | EntityModificationError {
    this.props.participants = newParticipants;
  }
}
