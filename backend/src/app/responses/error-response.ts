export class ErrorResponse {
  public readonly errorCode: number;
  public readonly data: string;

  constructor(errorCode: number, data: string = '') {
    this.errorCode = errorCode;
    this.data = data;
  }
}