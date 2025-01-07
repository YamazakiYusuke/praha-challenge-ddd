import { EntityError } from "../errors/entity_error";
import { Email } from "../values/email";
import { AdministratorId } from "../values/ids";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface AdministratorProps {
  readonly email: Email;
}

export class Administrator extends Entity<AdministratorId, AdministratorProps> {

  private constructor(id: AdministratorId, props: AdministratorProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AdministratorProps): Administrator {
    return new Administrator(AdministratorId.create(), props)
  }

  static restore(id: AdministratorId, props: AdministratorProps): Administrator {
    return new Administrator(id, props)
  }

  public get email(): Email {
    return this.props.email;
  }

  public changeEmail(newEmail: Email): void {
    if (!newEmail) {
      throw new EntityError('Email is required');
    }
    const newProps = { ...this.props, email: newEmail };
    this.setProps(newProps);
  }
}
