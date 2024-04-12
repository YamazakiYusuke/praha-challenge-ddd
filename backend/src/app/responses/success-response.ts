export class SuccessResponse {
  readonly data: string;

  constructor(data: string = '') {
    this.data = data;
  }
}