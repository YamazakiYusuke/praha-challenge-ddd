export class DomainServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainServiceError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DomainServiceError);
    }
  }
}
