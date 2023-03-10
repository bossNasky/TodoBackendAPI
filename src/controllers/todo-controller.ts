import { Request, Response } from "express";

const getAllTodos = function (req: Request, res: Response) {
  res.status(200).send({
    message: "success",
  });
};

export { getAllTodos };
