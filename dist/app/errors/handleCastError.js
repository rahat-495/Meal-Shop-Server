"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    const errorSources = [{ path: err.path, message: err.message }];
    return {
        statusCode,
        message: "Invalid Id",
        errorSources,
    };
};
exports.default = handleCastError;
