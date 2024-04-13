import { BaseError } from "src/domain/errors/base/base_error";

export class ValueObjectError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ValueObjectError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValueObjectError);
    }
  }
}
