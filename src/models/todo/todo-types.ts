import { Document } from "mongoose";

type TodoStatus = "active" | "finished";

interface Todo extends Document {
  title: string;
  status: TodoStatus;
}

export { Todo };
