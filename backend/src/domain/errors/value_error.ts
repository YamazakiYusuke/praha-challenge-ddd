export class ValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValueError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValueError);
    }
  }
}
