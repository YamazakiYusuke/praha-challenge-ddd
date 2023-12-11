import { EntityCreationError } from "../errors/entity_creation_error";
import { EntityModificationError } from "../errors/entity_modification_error";
import { Email } from "../values/email"
import { EnrollmentStatus } from "../values/enrollment-status";
import { Id } from "../values/id"
import { Name } from "../values/name"
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface ParticipantProps {
  name: Name;
  email: Email;
  teamId: Id;
  pairId: Id;
  enrollmentStatus: EnrollmentStatus;
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

  static create(props: ParticipantProps): Participant | EntityCreationError {
    return new Participant(Id.create(), props);
  }

  static restore(id: Id, props: ParticipantProps): Participant {
    return new Participant(id, props);
  }

  public get name(): Name {
    return this.props.name;
  }

  public get email(): Email {
    return this.props.email;
  }

  public get teamId(): Id {
    return this.props.teamId;
  }

  public get pairId(): Id {
    return this.props.pairId;
  }

  public get enrollmentStatus(): EnrollmentStatus {
    return this.props.enrollmentStatus;
  }

  public changeEnrollmentStatus(newStatus: EnrollmentStatus): Participant | EntityModificationError {
    if (!newStatus) {
      throw new EntityModificationError('New status is required');
    }
    if (this.props.enrollmentStatus.value === EnrollmentStatusValue.Withdrawn) {
      throw new EntityModificationError('Cannot change status of a withdrawn participant');
    }
    this.props.enrollmentStatus = newStatus;
    return this;
  }
}
