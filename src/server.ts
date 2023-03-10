import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./src/config/.env" });

const application = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

application.listen(SERVER_PORT, () => {
  console.log(`Server is listening at port ${SERVER_PORT}...`);
});
