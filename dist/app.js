"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const express_1 = __importDefault(require("express"));
const error_controller_1 = require("./controllers/error-controller");
const todo_router_1 = require("./router/todo-router");
const application = (0, express_1.default)();
exports.application = application;
application.use(express_1.default.json());
application.use("/api/v1/todos", todo_router_1.todoRouter);
application.all("*", error_controller_1.notFound);
application.use(error_controller_1.globalErrorMiddleware);
//# sourceMappingURL=app.js.map