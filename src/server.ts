import dotenv from "dotenv";
import { connectWithDatabase } from "./db/connect";
import { application } from "./app";

dotenv.config({ path: "./src/config/.env" });

const SERVER_PORT = process.env.SERVER_PORT || 3000;

application.listen(SERVER_PORT, () => {
  console.log(`Server is listening at port ${SERVER_PORT}...`);
  connectWithDatabase();
});
