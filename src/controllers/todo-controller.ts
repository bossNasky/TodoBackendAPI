import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo/todo-model";
import expressAsyncHandler from "express-async-handler";
import { CustomError } from "../features/CustomError";
import { APIFeatures } from "../features/APIFeatures";

/*
  --- @desc  Get all todos
  --- @route GET /api/v1/todos
  --- @access Public
*/

const getAllTodos = expressAsyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const feature = new APIFeatures(Todo.find(), req.query).filter();
  const todos = await feature.query;

  res.status(200).send({
    status: "success",
    data: {
      todos,
    },
  });
});

/*
  --- @desc  Create new todo
  --- @route POST /api/v1/todos
  --- @access Public
  --- @data  {
          title:string;
          status:"active" | "completed"
        }
*/

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

/*
  --- @desc  Update a todo
  --- @route PATCH /api/v1/todos/id
  --- @access Public
  --- @data
        id:Mongoose.ObjectID
        optional : {
          title:string;
          status:"active" | "completed"
        }
*/

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

/*
  --- @desc  Delete a todo
  --- @route DELETE /api/v1/todos/id
  --- @access Public
  --- @data
        id:Mongoose.ObjectID
*/

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
