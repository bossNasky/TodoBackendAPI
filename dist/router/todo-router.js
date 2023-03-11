"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo-controller");
const todoRouter = (0, express_1.Router)();
exports.todoRouter = todoRouter;
todoRouter.route("/").get(todo_controller_1.getAllTodos).post(todo_controller_1.createNewTodo);
todoRouter.route("/:id").delete(todo_controller_1.deleteTodo).patch(todo_controller_1.updateTodo);
//# sourceMappingURL=todo-router.js.map