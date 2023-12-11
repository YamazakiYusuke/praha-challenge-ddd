export class ValueCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValueCreationError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValueCreationError);
    }
  }
}
