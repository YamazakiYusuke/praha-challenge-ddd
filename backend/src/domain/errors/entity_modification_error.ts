export class EntityModificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityModificationError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EntityModificationError);
    }
  }
}
