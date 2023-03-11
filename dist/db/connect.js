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
exports.disconnectWithDatabase = exports.connectWithDatabase = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./src/config/.env" });
const connectWithDatabase = function () {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const databaseConnection = (_a = process.env.MONGO_ATLAS_URL) === null || _a === void 0 ? void 0 : _a.replace("<PASSWORD>", process.env.MONGO_ATLAS_PASSWORD);
            yield (0, mongoose_1.connect)(databaseConnection);
            console.log("Connected with database..");
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(`Error : ${err.message}`);
            }
            process.exit(0);
        }
    });
};
exports.connectWithDatabase = connectWithDatabase;
const disconnectWithDatabase = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.connection.close();
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(`Error : ${err.message}`);
            }
            process.exit(0);
        }
    });
};
exports.disconnectWithDatabase = disconnectWithDatabase;
//# sourceMappingURL=connect.js.map