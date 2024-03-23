import { PersonName } from "src/domain/values/name";
import { EnrollmentStatusValue } from "src/util/enums";
import { EntityError } from "../errors/entity_error";
import { Email } from "../values/email";
import { PairId, ParticipantId, TeamId } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface ParticipantProps {
  name: PersonName;
  email: Email;
  teamId: TeamId | undefined;
  pairId: PairId | undefined;
  enrollmentStatus: EnrollmentStatusValue;
}

export class Participant extends Entity<ParticipantId, ParticipantProps> {
  private constructor(id: ParticipantId, props: ParticipantProps) {
    validateProps(id, props, ['teamId', 'pairId']);
    super(id, props)
  }

  static create(props: ParticipantProps): Participant {
    return new Participant(ParticipantId.create(), props);
  }

  static restore(id: ParticipantId, props: ParticipantProps): Participant {
    return new Participant(id, props);
  }

  public get name(): PersonName {
    return this.props.name;
  }

  public get email(): Email {
    return this.props.email;
  }

  public get teamId(): TeamId | undefined {
    return this.props.teamId;
  }

  public get pairId(): PairId | undefined {
    return this.props.pairId;
  }

  public get enrollmentStatus(): EnrollmentStatusValue {
    return this.props.enrollmentStatus;
  }

  public changeEnrollmentStatusToEnrolled(teamId: TeamId, pairId: PairId): void {
    this.changeEnrollmentStatusValidation();
    this.props.enrollmentStatus = EnrollmentStatusValue.Enrolled;
    this.changeTeamIdPairId(pairId, teamId);
  }

  public changeEnrollmentStatusToOnLeave(): void {
    this.changeEnrollmentStatusValidation();
    this.deleteTeamIdPairId();
    this.props.enrollmentStatus = EnrollmentStatusValue.OnLeave;
  }

  public changeEnrollmentStatusToWithDrawn(): void {
    this.changeEnrollmentStatusValidation();
    this.deleteTeamIdPairId();
    this.props.enrollmentStatus = EnrollmentStatusValue.Withdrawn;
  }

  public changeTeamIdPairId(pairId: PairId, teamId: TeamId): void {
    this.props.pairId = pairId;
    this.props.teamId = teamId;
  }

  private deleteTeamIdPairId(): void {
    this.props.teamId = undefined;
    this.props.pairId = undefined;
  }

  private changeEnrollmentStatusValidation(): void {
    if (this.props.enrollmentStatus === EnrollmentStatusValue.Withdrawn) {
      // 既に退会済みの場合
      throw new EntityError('Cannot change status of a withdrawn participant');
    }
  }
}
