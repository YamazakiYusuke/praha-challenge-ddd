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

  private constructor(id: Id, name: Name, email: Email, teamId: Id, pairId: Id, enrollmentStatus: EnrollmentStatus) {
    super()
    this.id = id
    this.name = name
    this.email = email
    this.teamId = teamId
    this.pairId = pairId
    this.enrollmentStatus = enrollmentStatus
  }

  static create(props: { id: Id; name: Name; email: Email; teamId: Id; pairId: Id; enrollmentStatus: EnrollmentStatus }) {
    const { id, name, email, teamId, pairId, enrollmentStatus } = props
    return new Participant(id, name, email, teamId, pairId, enrollmentStatus);
  }

  public isEqual(other: any): boolean {
    if (!(other instanceof Participant)) return false
    return this.id === other.id;
  }
}
