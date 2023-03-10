import { Router } from "express";
import { getAllTodos } from "../controllers/todo-controller";

const todoRouter = Router();

todoRouter.get("/", getAllTodos);

export { todoRouter };
