import express from "express";
import dotenv from "dotenv";
import { connectWithDatabase } from "./db/connect";
import { todoRouter } from "./router/todo-router";

dotenv.config({ path: "./src/config/.env" });

connectWithDatabase();

const application = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

application.use("/api/v1/todos", todoRouter);

application.listen(SERVER_PORT, () => {
  console.log(`Server is listening at port ${SERVER_PORT}...`);
});
