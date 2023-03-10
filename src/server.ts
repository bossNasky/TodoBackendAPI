import express from "express";
import dotenv from "dotenv";
import { connectWithDatabase } from "./db/connect";

dotenv.config({ path: "./src/config/.env" });

connectWithDatabase();

const application = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

application.listen(SERVER_PORT, () => {
  console.log(`Server is listening at port ${SERVER_PORT}...`);
});
