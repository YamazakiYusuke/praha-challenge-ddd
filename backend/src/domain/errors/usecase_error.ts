export class UsecaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UsecaseError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UsecaseError);
    }
  }
}