import { BaseError } from "src/domain/errors/base/base_error";

export class CommandError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'CommandError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CommandError);
    }
  }
}