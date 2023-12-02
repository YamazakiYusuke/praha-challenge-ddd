import { Email } from "../values/email"
import { Id } from "../values/id"
import { Name } from "../values/name"
import { Entity } from "./entity"

/**
 * **sample code**
 * ```typescript
 * const props = {
 *  id: Id.create(),
 *  name: Name.create('Joe'),
 *  email: Email.create('sample@example.com'),
 *  teamId: Id.create(),
 *  pairId: Id.create(),
 *  enrollmentStatus: EnrollmentStatus.Enrolled,
 * }
 * const participant = Participant.create(props);
 * ```
 */
export class Participant extends Entity {
  private readonly id: Id
  private name: Name
  private email: Email
  private teamId: Id
  private pairId: Id
  private enrollmentStatus: EnrollmentStatus

  private constructor(props: { id: Id; name: Name; email: Email; teamId: Id; pairId: Id; enrollmentStatus: EnrollmentStatus }) {
    super()
    const { id, name, email, teamId, pairId, enrollmentStatus } = props
    this.id = id
    this.name = name
    this.email = email
    this.teamId = teamId
    this.pairId = pairId
    this.enrollmentStatus = enrollmentStatus
  }

  static create(props: { id: Id; name: Name; email: Email; teamId: Id; pairId: Id; enrollmentStatus: EnrollmentStatus }) {
    if (!props.id) {
      throw new Error('ID is required');
    }
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
    return new Participant(props);
  }

  static restore(props: { id: Id; name: Name; email: Email; teamId: Id; pairId: Id; enrollmentStatus: EnrollmentStatus }) {
    return new Participant(props);
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Participant)) return false
    return this.id === other.id;
  }
}
