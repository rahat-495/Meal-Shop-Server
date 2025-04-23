
import { z } from "zod"

const registerUserValidationSchema = z.object({
    body : z.object({
        name : z.string({}) ,
        email : z.string({}).email({message : "Invalid email address"}) ,
        password : z.string({}) ,
        profileImage : z.string({}) ,
        phoneNumber: z.string({ required_error: "Phone number is required" }).regex(/^01[0-9]{9}$/, "Invalid Bangladeshi phone number"),
    })
})

const loginUserValidationSchema = z.object({
    body : z.object({
        password : z.string({}) ,
        loginCredentials : z.string() ,
    })
})

export const userValidations = {
    loginUserValidationSchema ,
    registerUserValidationSchema ,
}
