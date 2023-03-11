"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createNewTodo = exports.getAllTodos = void 0;
const todo_model_1 = require("../models/todo/todo-model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const CustomError_1 = require("../features/CustomError");
const APIFeatures_1 = require("../features/APIFeatures");
/*
  --- @desc  Get all todos
  --- @route GET /api/v1/todos
  --- @access Public
*/
const getAllTodos = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const feature = new APIFeatures_1.APIFeatures(todo_model_1.Todo.find(), req.query).filter();
        const todos = yield feature.query;
        res.status(200).send({
            status: "success",
            data: {
                todos,
            },
        });
    });
});
exports.getAllTodos = getAllTodos;
/*
  --- @desc  Create new todo
  --- @route POST /api/v1/todos
  --- @access Public
  --- @data  {
          title:string;
          status:"active" | "completed"
        }
*/
const createNewTodo = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = yield todo_model_1.Todo.create(req.body);
        res.status(201).send({
            status: "success",
            data: {
                todo,
            },
        });
    });
});
exports.createNewTodo = createNewTodo;
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
const updateTodo = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const todo = yield todo_model_1.Todo.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!todo) {
            return next(new CustomError_1.CustomError("No found todo with that ID", 404));
        }
        res.status(200).send({
            status: "success",
            data: {
                todo,
            },
        });
    });
});
exports.updateTodo = updateTodo;
/*
  --- @desc  Delete a todo
  --- @route DELETE /api/v1/todos/id
  --- @access Public
  --- @data
        id:Mongoose.ObjectID
*/
const deleteTodo = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const todo = yield todo_model_1.Todo.findByIdAndDelete(id);
        if (!todo) {
            return next(new CustomError_1.CustomError("No found todo with that ID", 404));
        }
        res.status(204).send({
            status: "success",
            data: null,
        });
    });
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo-controller.js.map