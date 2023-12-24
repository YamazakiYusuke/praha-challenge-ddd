import { EntityError } from "../errors/entity_error";
import { Email } from "../values/email";
import { Id } from "../values/id";
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface AdministratorProps {
  email: Email;
}

export class Administrator extends Entity<AdministratorProps> {

  private constructor(id: Id, props: AdministratorProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AdministratorProps): Administrator | Error {
    return new Administrator(Id.create(), props)
  }

  static restore(id: Id, props: AdministratorProps): Administrator {
    return new Administrator(id, props)
  }

  public get email(): Email {
    return this.props.email;
  }

  public changeEmail(newEmail: Email): void | Error {
    if (!newEmail) {
      throw new EntityError('Email is required');
    }
    this.props.email = newEmail;
  }
}
