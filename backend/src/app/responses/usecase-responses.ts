export abstract class UsecaseResponse {}

export class SuccessResponse<T = any> implements UsecaseResponse {
  constructor(public readonly value: T) {}

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