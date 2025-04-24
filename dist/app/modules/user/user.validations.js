"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const registerUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({}),
        email: zod_1.z.string({}).email({ message: "Invalid email address" }),
        password: zod_1.z.string({}),
        profileImage: zod_1.z.string({}),
        phoneNumber: zod_1.z.string({ required_error: "Phone number is required" }).regex(/^01[0-9]{9}$/, "Invalid Bangladeshi phone number"),
    })
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({}),
        loginCredentials: zod_1.z.string(),
    })
});
exports.userValidations = {
    loginUserValidationSchema,
    registerUserValidationSchema,
};
