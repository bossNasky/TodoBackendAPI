import { connect, connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./src/config/.env" });

const connectWithDatabase = async function () {
  try {
    const databaseConnection = process.env.MONGO_ATLAS_URL?.replace(
      "<PASSWORD>",
      process.env.MONGO_ATLAS_PASSWORD as string
    ) as string;
    await connect(databaseConnection);
    console.log("Connected with database..");
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Error : ${err.message}`);
    }
    process.exit(0);
  }
};

const disconnectWithDatabase = async function () {
  try {
    await connection.close();
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Error : ${err.message}`);
    }
    process.exit(0);
  }
};

export { connectWithDatabase, disconnectWithDatabase };
