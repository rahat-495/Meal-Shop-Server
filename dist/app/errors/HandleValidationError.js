"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const statusCode = 400;
    const errorSources = Object.values(err.errors).map((value) => {
        return { path: value.path, message: value.message };
    });
    return {
        statusCode,
        message: "Validation error",
        errorSources,
    };
};
exports.default = handleValidationError;
