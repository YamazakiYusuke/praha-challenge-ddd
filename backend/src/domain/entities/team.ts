import { EntityCreationError } from "../errors/entity_creation_error";
import { Id } from "../values/id"
import { Name } from "../values/name";
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface TeamProps {
  name: Name;
  member: Array<Id>;
}
/**
 * **sample code**
 * ```typescript
 * const props: TeamProps = {
 *  name: new Name('Team Name'),
 *  member: [participant_id1, participant_id2],
 * }
 * const Team = Team.create(props);
 * ```
 */
export class Team extends Entity<TeamProps> {

  private constructor(id: Id, props: TeamProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: TeamProps): Team | EntityCreationError {
    return new Team(Id.create(), props)
  }

  static restore(id: Id, props: TeamProps): Team {
    return new Team(id, props)
  }

  public get name(): Name {
    return this.props.name;
  }

  public get member(): Array<Id> {
    return this.props.member;
  }

  public changeMember(newMember: Array<Id>): Team {
    // TODO: 
    return this;
  }
}
