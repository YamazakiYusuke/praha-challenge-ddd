export class EntityStateModificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityStateModificationError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EntityStateModificationError);
    }
  }
}
