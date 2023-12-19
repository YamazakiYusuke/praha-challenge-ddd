export class SuccessResponse {
  data: string;

  constructor(data?: string) {
    this.data = data || '';
  }
}