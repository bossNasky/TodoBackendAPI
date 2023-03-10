class CustomError extends Error {
  status: string;
  path!: string;
  value!: string;
  code!: number;
  errmsg!: any;
  errors!: any;
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

export { CustomError };
