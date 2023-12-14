export class CommandError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CommandError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CommandError);
    }
  }
}