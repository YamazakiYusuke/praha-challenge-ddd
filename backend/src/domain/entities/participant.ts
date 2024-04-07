import { PersonName } from "src/domain/values/name";
import { EnrollmentStatusValue } from "src/util/enums";
import { EntityError } from "../errors/entity_error";
import { Email } from "../values/email";
import { PairId, ParticipantId, TeamId } from "../values/ids";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface ParticipantProps {
  readonly name: PersonName;
  readonly email: Email;
  readonly teamId: TeamId | undefined;
  readonly pairId: PairId | undefined;
  readonly enrollmentStatus: EnrollmentStatusValue;
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
    const newProps = { ...this.props, enrollmentStatus: EnrollmentStatusValue.Enrolled };
    this.setProps(newProps);
    this.changeTeamIdPairId(pairId, teamId);
  }

  public changeEnrollmentStatusToOnLeave(): void {
    this.changeEnrollmentStatusValidation();
    this.deleteTeamIdPairId();
    const newProps = { ...this.props, enrollmentStatus: EnrollmentStatusValue.OnLeave };
    this.setProps(newProps);
  }

  public changeEnrollmentStatusToWithDrawn(): void {
    this.changeEnrollmentStatusValidation();
    this.deleteTeamIdPairId();
    const newProps = { ...this.props, enrollmentStatus: EnrollmentStatusValue.Withdrawn };
    this.setProps(newProps);
  }

  public changeTeamIdPairId(pairId: PairId, teamId: TeamId): void {
    const newProps = { ...this.props, pairId: pairId, teamId: teamId };
    this.setProps(newProps);
  }

  private deleteTeamIdPairId(): void {
    const newProps = { ...this.props, pairId: undefined, teamId: undefined };
    this.setProps(newProps);
  }

  private changeEnrollmentStatusValidation(): void {
    if (this.props.enrollmentStatus === EnrollmentStatusValue.Withdrawn) {
      // 既に退会済みの場合
      throw new EntityError('Cannot change status of a withdrawn participant');
    }
  }
}
