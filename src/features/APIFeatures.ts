import { Query } from "mongoose";
import { Todo } from "../models/todo/todo-types";

type QueryObject = {
  [key: string]: any;
};

class APIFeatures {
  constructor(
    public query: Query<Todo[], Todo>,
    public queryObject: QueryObject
  ) {}

  filter() {
    this.query = this.query.find(this.queryObject);
    return this;
  }
}

export { APIFeatures };
