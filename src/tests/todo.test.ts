import { connection } from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
import { application } from "../app";
import { connectWithDatabase, disconnectWithDatabase } from "../db/connect";
import { Server } from "node:http";

dotenv.config({ path: "./src/config/.env" });

let server: Server;

beforeEach(async () => {
  await connectWithDatabase();
});

afterEach(async () => {
  await disconnectWithDatabase();
});

describe("GET /api/v1/todos", () => {
  it("Should return all todos", async () => {
    const response = await request(application).get("/api/v1/todos");
    const { data, status } = response.body;
    expect(response.statusCode).toBe(200);
    expect(status).toBe("success");
    expect(data.todos.length).toBeGreaterThan(0);
  });
  it("Should return filtered todos with filter searching query", async () => {
    const filteredQuery = "title=Hello";
    const response = await request(application).get(
      `/api/v1/todos?${filteredQuery}`
    );
    const { data, status } = response.body;
    expect(response.statusCode).toBe(200);
    expect(status).toBe("success");
    expect(data.todos.length).toBeGreaterThan(0);
  });
});

describe("POST /api/v1/todos", () => {
  it("Should create a new todo", async () => {
    const todoTitle = "Test";
    const todoStatus = "active";
    const response = await request(application).post("/api/v1/todos").send({
      title: todoTitle,
      status: todoStatus,
    });
    const { data, status } = response.body;
    expect(response.statusCode).toBe(201);
    expect(status).toBe("success");
    expect(data.todo.title).toBe(todoTitle);
    expect(data.todo.status).toBe(todoStatus);
  });
  it("Should not create a todo with valid todo status", async () => {
    const todoTitle = "Test";
    const todoStatus = "invalid";
    const response = await request(application).post("/api/v1/todos").send({
      title: todoTitle,
      status: todoStatus,
    });
    const { data, message, status } = response.body;
    expect(response.statusCode).toBe(400);
    expect(status).toBe("fail");
    expect(message).toBe(
      "Invalid input data. Todo status only can be active or completed!"
    );
    expect(data).toBeUndefined();
  });
  it("Should create todo without providing todo status", async () => {
    const todoTitle = "Test";
    const response = await request(application).post("/api/v1/todos").send({
      title: todoTitle,
    });
    const { data, status } = response.body;
    expect(response.statusCode).toBe(201);
    expect(status).toBe("success");
    expect(data.todo.title).toBe(todoTitle);
    expect(data.todo.status).toBe("active");
  });
});

describe("PATCH /api/v1/todos/:id", () => {
  it("Should update a todo with provided id", async () => {
    const id = "640c622aa66ee21837fbb573";
    const todoTitle = "Test";
    const todoStatus = "active";
    const response = await request(application)
      .patch(`/api/v1/todos/${id}`)
      .send({
        title: todoTitle,
        status: todoStatus,
      });
    const { data, status } = response.body;
    expect(response.statusCode).toBe(200);
    expect(status).toBe("success");
    expect(data.todo.title).toBe(todoTitle);
    expect(data.todo.status).toBe(todoStatus);
  });
  it("Should return a error when valid data is provided", async () => {
    const id = "640c622aa66ee21837fbb573";
    const todoTitle = "Test";
    const todoStatus = "invalid";
    const response = await request(application)
      .patch(`/api/v1/todos/${id}`)
      .send({
        title: todoTitle,
        status: todoStatus,
      });
    const { data, message, status } = response.body;
    expect(response.statusCode).toBe(400);
    expect(status).toBe("fail");
    expect(message).toBe(
      "Invalid input data. Todo status only can be active or completed!"
    );
    expect(data).toBeUndefined();
  });
  it("Should return a error when provided valid id", async () => {
    const id = "640c622aa66ee21837fbb573";
    const response = await request(application).patch(`/api/v1/todos/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No found todo with that ID");
  });
});

describe("DELETE /api/v1/todos/:id", () => {
  it("Should delete a todo with provided id", async () => {
    const id = "640c622aa66ee21837fbb573";
    const response = await request(application).delete(`/api/v1/todos/${id}`);
    expect(response.statusCode).toBe(204);
  });
  it("Should return a error when provided valid id", async () => {
    const id = "640c622aa66ee21837fbb573";
    const response = await request(application).delete(`/api/v1/todos/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No found todo with that ID");
  });
});
