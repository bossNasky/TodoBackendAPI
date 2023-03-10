import { Request, Response } from "express";
import { Todo } from "../models/todo/todo-model";

const getAllTodos = function (req: Request, res: Response) {
  res.status(200).send({
    message: "success",
  });
};

export { getAllTodos };
