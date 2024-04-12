export class ValueObjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValueObjectError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValueObjectError);
    }
  }
}
