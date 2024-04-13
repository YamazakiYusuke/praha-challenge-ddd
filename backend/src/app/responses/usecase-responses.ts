export abstract class UsecaseResponse {}

export class SuccessResponse implements UsecaseResponse {
  constructor(public readonly value: any = undefined) {}

  get isSuccessResponse(): boolean {
    return true;
  }
}

export class ExpectedErrorResponse implements UsecaseResponse {
  get isExpectedErrorResponse(): boolean {
    return true;
  }
}

export class UnExpectedErrorResponse implements UsecaseResponse {
  get isUnExpectedErrorResponse(): boolean {
    return true;
  }
}