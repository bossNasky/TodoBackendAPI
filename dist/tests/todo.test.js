"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("../app");
const connect_1 = require("../db/connect");
dotenv_1.default.config({ path: "./src/config/.env" });
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.connectWithDatabase)();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.disconnectWithDatabase)();
}));
describe("GET /api/v1/todos", () => {
    it("Should return all todos", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.application).get("/api/v1/todos");
        const { data, status } = response.body;
        expect(response.statusCode).toBe(200);
        expect(status).toBe("success");
        expect(data.todos.length).toBeGreaterThan(0);
    }));
    it("Should return filtered todos with filter searching query", () => __awaiter(void 0, void 0, void 0, function* () {
        const filteredQuery = "title=Hello";
        const response = yield (0, supertest_1.default)(app_1.application).get(`/api/v1/todos?${filteredQuery}`);
        const { data, status } = response.body;
        expect(response.statusCode).toBe(200);
        expect(status).toBe("success");
        expect(data.todos.length).toBeGreaterThan(0);
    }));
});
describe("POST /api/v1/todos", () => {
    it("Should create a new todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoTitle = "Test";
        const todoStatus = "active";
        const response = yield (0, supertest_1.default)(app_1.application).post("/api/v1/todos").send({
            title: todoTitle,
            status: todoStatus,
        });
        const { data, status } = response.body;
        expect(response.statusCode).toBe(201);
        expect(status).toBe("success");
        expect(data.todo.title).toBe(todoTitle);
        expect(data.todo.status).toBe(todoStatus);
    }));
    it("Should not create a todo with valid todo status", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoTitle = "Test";
        const todoStatus = "invalid";
        const response = yield (0, supertest_1.default)(app_1.application).post("/api/v1/todos").send({
            title: todoTitle,
            status: todoStatus,
        });
        const { data, message, status } = response.body;
        expect(response.statusCode).toBe(400);
        expect(status).toBe("fail");
        expect(message).toBe("Invalid input data. Todo status only can be active or completed!");
        expect(data).toBeUndefined();
    }));
    it("Should create todo without providing todo status", () => __awaiter(void 0, void 0, void 0, function* () {
        const todoTitle = "Test";
        const response = yield (0, supertest_1.default)(app_1.application).post("/api/v1/todos").send({
            title: todoTitle,
        });
        const { data, status } = response.body;
        expect(response.statusCode).toBe(201);
        expect(status).toBe("success");
        expect(data.todo.title).toBe(todoTitle);
        expect(data.todo.status).toBe("active");
    }));
});
describe("PATCH /api/v1/todos/:id", () => {
    it("Should update a todo with provided id", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "640c622aa66ee21837fbb573";
        const todoTitle = "Test";
        const todoStatus = "active";
        const response = yield (0, supertest_1.default)(app_1.application)
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
    }));
    it("Should return a error when valid data is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "640c622aa66ee21837fbb573";
        const todoTitle = "Test";
        const todoStatus = "invalid";
        const response = yield (0, supertest_1.default)(app_1.application)
            .patch(`/api/v1/todos/${id}`)
            .send({
            title: todoTitle,
            status: todoStatus,
        });
        const { data, message, status } = response.body;
        expect(response.statusCode).toBe(400);
        expect(status).toBe("fail");
        expect(message).toBe("Invalid input data. Todo status only can be active or completed!");
        expect(data).toBeUndefined();
    }));
    it("Should return a error when provided valid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "640c622aa66ee21837fbb573";
        const response = yield (0, supertest_1.default)(app_1.application).patch(`/api/v1/todos/${id}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("No found todo with that ID");
    }));
});
describe("DELETE /api/v1/todos/:id", () => {
    it("Should delete a todo with provided id", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "640c622aa66ee21837fbb573";
        const response = yield (0, supertest_1.default)(app_1.application).delete(`/api/v1/todos/${id}`);
        expect(response.statusCode).toBe(204);
    }));
    it("Should return a error when provided valid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "640c622aa66ee21837fbb570";
        const response = yield (0, supertest_1.default)(app_1.application).delete(`/api/v1/todos/${id}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("No found todo with that ID");
    }));
});
//# sourceMappingURL=todo.test.js.map