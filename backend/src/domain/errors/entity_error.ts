export class EntityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EntityError);
    }
  }
}
