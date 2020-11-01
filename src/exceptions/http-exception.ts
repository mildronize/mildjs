export class HttpException extends Error {
  public code: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.code = status;
    this.message = message;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
