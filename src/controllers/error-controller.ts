import { NextFunction, Request, Response } from "express";
import { CustomError } from "../features/CustomError";

const handleCastErrorDB = function (err: CustomError) {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new CustomError(message, 400);
};

const handleDuplicateFieldsDB = function (err: CustomError) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new CustomError(message, 400);
};
const handleValidationErrorDB = function (err: CustomError) {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new CustomError(message, 400);
};

const sendError = function (err: CustomError, res: Response) {
  const { status = "fail", statusCode = 500, message, stack } = err;

  res.status(statusCode).send({
    status,
    message,
    stack,
  });
};

const globalErrorMiddleware = function (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let error = { ...err };
  if (err.name === "CastError") {
    error = handleCastErrorDB(error);
  }
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (err.name === "ValidationError") error = handleValidationErrorDB(error);
  sendError(error, res);
};

export { globalErrorMiddleware };
