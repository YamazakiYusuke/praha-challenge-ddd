import { EntityCreationError } from "../errors/entity_creation_error";
import { Id } from "../values/id"
import { Name } from "../values/name";
import { Entity } from "./base/entity"

export interface PairProps {
  name: Name;
  member: Array<Id>;
}
/**
 * **sample code**
 * ```typescript
 * const props: PairProps = {
 *  name: new Name('Pair Name'),
 *  member: [participant_id1, participant_id2],
 * }
 * const pair = Pair.create(props);
 * ```
 */
export class Pair extends Entity<PairProps> {

  private constructor(id: Id, props: PairProps) {
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

  public get member(): Array<Id> {
    return this.props.member;
  }

  public changeMember(newMember: Array<Id>): void {
    // TODO: 
  }
}
