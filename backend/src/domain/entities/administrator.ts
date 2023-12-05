import { Email } from "../values/email";
import { Id } from "../values/id";
import { Entity } from "./entity"

export interface AdministratorProps {
  email: Email;
}
/**
 * **sample code**
 * ```typescript
 * const props = AdministratorProps {
 *  email: Email.create('admin@example.com'),
 * }
 * const administrator = Administrator.create(props);
 * ```
 */
export class Administrator extends Entity<AdministratorProps> {

  private constructor(id: Id, props: AdministratorProps) {
    super(id, props)
  }

  static create(props: AdministratorProps): Administrator | EntityCreationError {
    return new Administrator(Id.create(), props)
  }

  static restore(id: Id, props: AdministratorProps): Administrator {
    return new Administrator(id, props)
  }

  public get number(): Email {
    return this.props.email;
  }

  public changeEmail(newEmail: Email): void {
    if (!newEmail) {
      throw new Error('Email is required');
    }
    this.props.email = newEmail;
  }
}
