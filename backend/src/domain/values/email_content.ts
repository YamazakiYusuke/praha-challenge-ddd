import { Value } from "./base/value";

export interface EmailContentProps {
  title: string;
  body: string;
}

export class EmailContent extends Value<EmailContentProps> {
  private constructor(props: EmailContentProps) {
    super(props);
  }

  static create(props: EmailContentProps): EmailContent | Error {
    if (!props.title || !props.body) {
      return new Error("Title and body are required for EmailContent.");
    }
    return new EmailContent(props);
  }

  static restore(props: EmailContentProps): EmailContent {
    return new EmailContent(props);
  }

  public get title(): string {
    return this.props.title;
  }

  public get body(): string {
    return this.props.body;
  }
}