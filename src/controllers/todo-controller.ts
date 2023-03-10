import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo/todo-model";
import expressAsyncHandler from "express-async-handler";
import { CustomError } from "../features/CustomError";

const getAllTodos = expressAsyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todos = await Todo.find({});

  res.status(200).send({
    status: "success",
    data: {
      todos,
    },
  });
});

const createNewTodo = expressAsyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todo = await Todo.create(req.body);
  res.status(201).send({
    status: "success",
    data: {
      todo,
    },
  });
});

const updateTodo = expressAsyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const todo = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return next(new CustomError("No found todo with that ID", 404));
  }

  res.status(200).send({
    status: "success",
    data: {
      todo,
    },
  });
});

const deleteTodo = expressAsyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    return next(new CustomError("No found todo with that ID", 404));
  }

  res.status(204).send({
    status: "success",
    data: null,
  });
});

export { getAllTodos, createNewTodo, updateTodo, deleteTodo };
