import { NextFunction, Request, Response } from "express";

const globalErrorMiddleware = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
};

export { globalErrorMiddleware };
