"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./db/connect");
const app_1 = require("./app");
dotenv_1.default.config({ path: "./src/config/.env" });
const SERVER_PORT = process.env.SERVER_PORT || 3000;
app_1.application.listen(SERVER_PORT, () => {
    console.log(`Server is listening at port ${SERVER_PORT}...`);
    (0, connect_1.connectWithDatabase)();
});
//# sourceMappingURL=server.js.map