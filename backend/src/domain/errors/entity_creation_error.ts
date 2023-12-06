export class EntityCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityCreationError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EntityCreationError);
    }
  }
}
