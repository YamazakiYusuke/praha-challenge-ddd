import { Administrator } from "src/domain/entities/administrator";
import { EntityError } from "src/domain/errors/entity_error";
import { EmailStatus } from "src/domain/util/enums";
import { AdminEmailContent } from "src/domain/values/admin-email-content";
import { Email } from "src/domain/values/email";
import { AdminEmailId } from "../values/ids";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface AdminEmailProps {
  readonly content: AdminEmailContent;
  readonly recipients: Administrator[];
  readonly sentDateTime?: Date;
  readonly status: EmailStatus;
  readonly errorMessage?: string;
}

export class AdminEmail extends Entity<AdminEmailId, AdminEmailProps> {

  private constructor(id: AdminEmailId, props: AdminEmailProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AdminEmailProps): AdminEmail {
    if (props.status != EmailStatus.Pending) {
      throw new EntityError('Initial status must be pending');
    }
    return new AdminEmail(AdminEmailId.create(), props)
  }

  static restore(id: AdminEmailId, props: AdminEmailProps): AdminEmail {
    return new AdminEmail(id, props)
  }

  public get title(): string {
    return this.props.content.title;
  }

  public get body(): string {
    return this.props.content.body;
  }

  public get recipients(): Administrator[] {
    return this.props.recipients;
  }

  public get recipientEmails(): Email[] {
    return this.props.recipients.map((element) => element.email);
  }

  public get sentDateTime(): Date | undefined {
    return this.props.sentDateTime;
  }

  public get status(): EmailStatus {
    return this.props.status;
  }

  public get errorMessage(): string | undefined {
    return this.props.errorMessage;
  }

  public setSentDateTime(newSentDateTime: Date) {
    const newProps = { ...this.props, sentDateTime: newSentDateTime };
    this.setProps(newProps);
  }

  public setStatus(newEmailStatus: EmailStatus) {
    if (this.status == EmailStatus.Sent) {
      throw new EntityError('Current status is already sent.');
    }
    const newProps = { ...this.props, status: newEmailStatus };
    this.setProps(newProps);
  }

  public setErrorMessage(newErrorMessage: string) {
    if (this.status != EmailStatus.Error) {
      throw new EntityError('Current status is not error.');
    }
    const newProps = { ...this.props, errorMessage: newErrorMessage };
    this.setProps(newProps);
  }
}
