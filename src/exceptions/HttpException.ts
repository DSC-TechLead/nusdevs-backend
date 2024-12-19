export class HttpException extends Error {
  public status: number;
  public message: string;
  public data: object | undefined;
  public headers: object | undefined;

  constructor(status: number, message: string, data?: object, headers?: object) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;
    this.headers = headers;
  }
}
