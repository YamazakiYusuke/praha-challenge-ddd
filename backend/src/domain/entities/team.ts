import { TeamName } from "src/domain/values/name";
import { TeamId } from "../values/id"
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface TeamProps {
  name: TeamName;
}

export class Team extends Entity<TeamProps> {

  private constructor(id: TeamId, props: TeamProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: TeamProps): Team | Error {
    return new Team(TeamId.create(), props)
  }

  static restore(id: TeamId, props: TeamProps): Team {
    return new Team(id, props)
  }

  public get name(): TeamName {
    return this.props.name;
  }
}
