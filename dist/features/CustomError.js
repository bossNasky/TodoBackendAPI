"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith("4") ? "fail" : "error";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map