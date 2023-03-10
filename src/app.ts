import express from "express";
import {
  globalErrorMiddleware,
  notFound,
} from "./controllers/error-controller";
import { todoRouter } from "./router/todo-router";
import cors from "cors";

const application = express();

application.use(express.json());
application.use(cors());
application.use("/api/v1/todos", todoRouter);
application.all("*", notFound);
application.use(globalErrorMiddleware);

export { application };
