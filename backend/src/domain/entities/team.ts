import { TeamName } from "src/domain/values/team-name";
import { Id } from "../values/id"
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface TeamProps {
  name: TeamName;
  member: Array<Id>;
}

export class Team extends Entity<TeamProps> {

  private constructor(id: Id, props: TeamProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: TeamProps): Team | Error {
    return new Team(Id.create(), props)
  }

  static restore(id: Id, props: TeamProps): Team {
    return new Team(id, props)
  }

  public get name(): TeamName {
    return this.props.name;
  }

  public get member(): Array<Id> {
    return this.props.member;
  }

  public changeMember(newMember: Array<Id>): void {
    // TODO: 
  }
}
