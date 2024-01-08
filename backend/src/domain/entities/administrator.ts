import { EntityError } from "../errors/entity_error";
import { Email } from "../values/email";
import { AdministratorId } from "../values/id";
import { Entity } from "./base/entity"
import { validateProps } from "./utils/validate-props";

export interface AdministratorProps {
  email: Email;
}

export class Administrator extends Entity<AdministratorProps> {

  private constructor(id: AdministratorId, props: AdministratorProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AdministratorProps): Administrator | Error {
    return new Administrator(AdministratorId.create(), props)
  }

  static restore(id: AdministratorId, props: AdministratorProps): Administrator {
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
