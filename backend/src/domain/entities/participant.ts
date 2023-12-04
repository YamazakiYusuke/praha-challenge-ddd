import { Email } from "../values/email"
import { EnrollmentStatus } from "../values/enrollment-status";
import { Id } from "../values/id"
import { Name } from "../values/name"
import { Entity } from "./entity"

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
    super(id, props)
  }

  static create(props: ParticipantProps): Participant | Error {
    if (!props.name) {
      throw new Error('Name is required');
    }
    if (!props.email) {
      throw new Error('Email is required');
    }
    if (!props.teamId) {
      throw new Error('Team ID is required');
    }
    if (!props.pairId) {
      throw new Error('Pair ID is required');
    }
    if (!props.enrollmentStatus) {
      throw new Error('Enrollment status is required');
    }
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
}
