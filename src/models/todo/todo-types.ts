import { Document } from "mongoose";

type TodoStatus = "active" | "completed";

interface Todo extends Document {
  title: string;
  status: TodoStatus;
}

export { Todo };
