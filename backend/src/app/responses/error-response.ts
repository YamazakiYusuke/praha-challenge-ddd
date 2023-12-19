export class ErrorResponse {
  data: string;

  constructor(data?: any) {
    this.data = data || null;
  }
}