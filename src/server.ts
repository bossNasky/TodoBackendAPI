import express from "express";
import dotenv from "dotenv";
import { connectWithDatabase } from "./db/connect";
import { todoRouter } from "./router/todo-router";
import {
  globalErrorMiddleware,
  notFound,
} from "./controllers/error-controller";

dotenv.config({ path: "./src/config/.env" });

connectWithDatabase();

const application = express();
application.use(express.json());

const SERVER_PORT = process.env.SERVER_PORT || 3000;

application.use("/api/v1/todos", todoRouter);
application.all("*", notFound);
application.use(globalErrorMiddleware);

application.listen(SERVER_PORT, () => {
  console.log(`Server is listening at port ${SERVER_PORT}...`);
});
