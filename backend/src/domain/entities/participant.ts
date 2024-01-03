import { PersonName } from "src/domain/values/person-name";
import { EntityError } from "../errors/entity_error";
import { Email } from "../values/email";
import { Id } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";
import { EnrollmentStatusValue } from "src/util/enums";

export interface ParticipantProps {
  name: PersonName;
  email: Email;
  teamId: Id | undefined;
  pairId: Id | undefined;
  enrollmentStatus: EnrollmentStatusValue;
}

export class Participant extends Entity<ParticipantProps> {
  private constructor(id: Id, props: ParticipantProps) {
    validateProps(id, props, ['teamId', 'pairId']);
    super(id, props)
  }

  // 新規参加者の追加はプラハのアプリからは行わず、管理システムから行う
  // static create(props: ParticipantProps): Participant | EntityCreationError {
  //   return new Participant(Id.create(), props);
  // }

  static restore(id: Id, props: ParticipantProps): Participant {
    return new Participant(id, props);
  }

  public get name(): PersonName {
    return this.props.name;
  }

  public get email(): Email {
    return this.props.email;
  }

  public get teamId(): Id | undefined {
    return this.props.teamId;
  }

  public get pairId(): Id | undefined {
    return this.props.pairId;
  }

  public get enrollmentStatus(): EnrollmentStatusValue {
    return this.props.enrollmentStatus;
  }

  public changeEnrollmentStatusToEnrolled(teamId: Id, pairId: Id): void | Error {
    this.changeEnrollmentStatusValidation();
    this.props.enrollmentStatus = EnrollmentStatusValue.Enrolled;
    this.setTeamIdPairId(pairId, teamId);
  }

  public changeEnrollmentStatusToOnLeave(): void | Error {
    this.changeEnrollmentStatusValidation();
    this.deleteTeamIdPairId();
    this.props.enrollmentStatus = EnrollmentStatusValue.OnLeave;
  }

  public changeEnrollmentStatusToWithDrawn(): void | Error {
    this.changeEnrollmentStatusValidation();
    this.deleteTeamIdPairId();
    this.props.enrollmentStatus = EnrollmentStatusValue.Withdrawn;
  }

  private setTeamIdPairId(pairId: Id, teamId: Id): void {
    this.props.pairId = pairId;
    this.props.teamId = teamId;
  }

  public deleteTeamIdPairId(): void {
    this.props.teamId = undefined;
    this.props.pairId = undefined;
  }

  private changeEnrollmentStatusValidation(): void | Error {
    if (this.props.enrollmentStatus === EnrollmentStatusValue.Withdrawn) {
      // 既に退会済みの場合
      throw new EntityError('Cannot change status of a withdrawn participant');
    }
  }
}
