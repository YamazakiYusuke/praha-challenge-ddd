export class ValueModificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValueModificationError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValueModificationError);
    }
  }
}
