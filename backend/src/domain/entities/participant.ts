import { EntityCreationError } from "../errors/entity_creation_error";
import { EntityModificationError } from "../errors/entity_modification_error";
import { Email } from "../values/email"
import { Id } from "../values/id"
import { Name } from "../values/name"
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface ParticipantProps {
  name: Name;
  email: Email;
  teamId: Id | undefined;
  pairId: Id | undefined;
  enrollmentStatus: EnrollmentStatusValue;
}
/**
 * **sample code**
 * ```typescript
 * const props = ParticipantProps {
 *  name: Name.create('Joe'),
 *  email: Email.create('sample@example.com'),
 *  teamId: teamId,
 *  pairId: pairId,
 *  enrollmentStatus: EnrollmentStatus(EnrollmentStatusValue.Enrolled),
 * }
 * const participant = Participant.create(props);
 * ```
 */
export class Participant extends Entity<ParticipantProps> {
  private constructor(id: Id, props: ParticipantProps) {
    validateProps(id, props);
    super(id, props)
  }

  // 新規参加者の追加はプラハのアプリからは行わず、管理システムから行う
  // static create(props: ParticipantProps): Participant | EntityCreationError {
  //   return new Participant(Id.create(), props);
  // }

  static restore(id: Id, props: ParticipantProps): Participant {
    return new Participant(id, props);
  }

  public get name(): Name {
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

  public changeEnrollmentStatusToEnrolled(pairId: Id, teamId: Id): void | EntityModificationError {
    this.changeEnrollmentStatusValidation();
    if (this.props.enrollmentStatus !== EnrollmentStatusValue.OnLeave) {
      throw new EntityModificationError('EnrollmentStatus is not OnLeave');
    }
    this.props.enrollmentStatus = EnrollmentStatusValue.Enrolled;
    this.props.pairId = pairId;
    this.props.teamId = teamId;
  }

  public changeEnrollmentStatusToOnLeave(): void | EntityModificationError {
    this.changeEnrollmentStatusValidation();
    if (this.props.enrollmentStatus !== EnrollmentStatusValue.Enrolled) {
      throw new EntityModificationError('EnrollmentStatus is not Enrolled');
    }
    this.props.teamId = undefined;
    this.props.pairId = undefined;
    this.props.enrollmentStatus = EnrollmentStatusValue.OnLeave;
  }

  public changeEnrollmentStatusToWithDrawn(): void | EntityModificationError {
    this.changeEnrollmentStatusValidation();
    this.props.teamId = undefined;
    this.props.pairId = undefined;
    this.props.enrollmentStatus = EnrollmentStatusValue.Withdrawn;
  }

  private changeEnrollmentStatusValidation(): void | EntityModificationError {
    if (this.props.enrollmentStatus === EnrollmentStatusValue.Withdrawn) {
      // 既に退会済みの場合
      throw new EntityModificationError('Cannot change status of a withdrawn participant');
    }
  }
}
