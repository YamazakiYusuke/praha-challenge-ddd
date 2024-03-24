import { TeamName } from "src/domain/values/name";
import { ParticipantId, TeamId } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface TeamProps {
  readonly name: TeamName;
  readonly participantIds: ParticipantId[];
  readonly generationId: string,
}

export class Team extends Entity<TeamId, TeamProps> {
  static readonly minNumber = 2;
  private constructor(id: TeamId, props: TeamProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: TeamProps): Team {
    return new Team(TeamId.create(), props)
  }

  static restore(id: TeamId, props: TeamProps): Team {
    return new Team(id, props)
  }

  public get name(): TeamName {
    return this.props.name;
  }

  public get participantIds(): ParticipantId[] {
    return this.props.participantIds;
  }

  public get participantsLength(): number {
    return this.participantIds.length;
  }

  public get generationId(): string {
    return this.props.generationId;
  }

  public get hasValidNumberOfParticipants(): boolean {
    return this.participantsLength >= Team.minNumber;
  }

  public get hasInsufficientMinParticipants(): boolean {
    return this.participantsLength < Team.minNumber;
  }
}
