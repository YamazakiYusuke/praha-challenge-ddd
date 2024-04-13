import { BaseError } from "src/domain/errors/base/base_error";

export class DomainServiceError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'DomainServiceError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DomainServiceError);
    }
  }
}
