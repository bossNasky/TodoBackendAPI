import { connection } from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
import { application } from "../app";
import { connectWithDatabase } from "../db/connect";
import { Server } from "node:http";

dotenv.config({ path: "./src/config/.env" });

let server: Server;

beforeEach(async () => {
  connectWithDatabase();
  server = application.listen(3000);
});

afterEach(async () => {
  await connection.close();
  server.close();
});

describe("TODO API test", () => {
  it("GET /api/v1/todos should return all products", async () => {
    const response = await request(application).get("/api/v1/todos");
    expect(response.statusCode).toBe(200);
  });
});
