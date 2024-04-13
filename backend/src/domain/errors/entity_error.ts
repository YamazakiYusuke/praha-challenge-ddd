import { BaseError } from "src/domain/errors/base/base_error";

export class EntityError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'EntityError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EntityError);
    }
  }
}
