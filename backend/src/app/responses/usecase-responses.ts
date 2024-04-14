export abstract class UsecaseErrorResponse { }

export class UsecaseSuccessResponse<T = any> {
  constructor(public readonly value: T) { }

  get isSuccessResponse(): boolean {
    return true;
  }
}

export class ExpectedErrorResponse implements UsecaseErrorResponse {
  get isExpectedErrorResponse(): boolean {
    return true;
  }
}

export class UnExpectedErrorResponse implements UsecaseErrorResponse {
  get isUnExpectedErrorResponse(): boolean {
    return true;
  }
}