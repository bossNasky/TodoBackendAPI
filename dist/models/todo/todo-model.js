"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Todo title is required!"],
    },
    status: {
        type: String,
        enum: {
            values: ["active", "completed"],
            message: "Todo status only can be active or completed!",
        },
        default: "active",
        required: [true, "Todo status i required!"],
    },
});
const Todo = (0, mongoose_1.model)("Todo", todoSchema);
exports.Todo = Todo;
//# sourceMappingURL=todo-model.js.map