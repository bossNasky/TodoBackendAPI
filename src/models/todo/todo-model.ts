import { model, Model, Schema } from "mongoose";
import { Todo } from "./todo-types";

const todoSchema = new Schema<Todo>({
  title: {
    type: String,
    required: [true, "Todo title is required!"],
  },
  status: {
    type: String,
    enum: {
      values: ["active", "finished"],
      message: "Todo status only can be active or finished!",
    },
    default: "active",
    required: [true, "Todo status i required!"],
  },
});

const Todo: Model<Todo> = model<Todo>("Todo", todoSchema);

export { Todo };
