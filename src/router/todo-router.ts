import { Router } from "express";
import {
  createNewTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo-controller";

const todoRouter = Router();

todoRouter.route("/").get(getAllTodos).post(createNewTodo);
todoRouter.route("/:id").delete(deleteTodo).patch(updateTodo);

export { todoRouter };
