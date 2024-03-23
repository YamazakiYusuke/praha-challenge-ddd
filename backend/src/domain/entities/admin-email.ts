import { Administrator } from "src/domain/entities/administrator";
import { EntityError } from "src/domain/errors/entity_error";
import { Email } from "src/domain/values/email";
import { EmailContent } from "src/domain/values/email_content";
import { EmailStatus } from "src/util/enums";
import { AdminEmailId } from "../values/id";
import { Entity } from "./base/entity";
import { validateProps } from "./utils/validate-props";

export interface AdminEmailProps {
  content: EmailContent;
  recipients: Administrator[];
  sentDateTime?: Date;
  status: EmailStatus;
  errorMessage?: string;
}

export class AdminEmail extends Entity<AdminEmailId, AdminEmailProps> {

  private constructor(id: AdminEmailId, props: AdminEmailProps) {
    validateProps(id, props);
    super(id, props)
  }

  static create(props: AdminEmailProps): AdminEmail {
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
    this.props.sentDateTime = newSentDateTime;
  }

  public setStatus(newEmailStatus: EmailStatus) {
    if (this.status == EmailStatus.Sent) {
      throw new EntityError('Current status is already sent.');
    }
    this.props.status = newEmailStatus;
  }

  public setErrorMessage(newErrorMessage: string) {
    this.props.errorMessage = newErrorMessage;
  }
}
