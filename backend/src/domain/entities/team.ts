import { Id } from "../values/id"
import { Name } from "../values/name";
import { Entity } from "./entity"

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
    super(id, props)
  }

  static create(props: TeamProps): Team | Error {
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

  public changeMember(newMember: Array<Id>): void {
    // TODO: 
  }
}
