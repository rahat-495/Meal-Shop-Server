
import { z } from "zod"

const registerUserValidationSchema = z.object({
    body : z.object({
        name : z.string({}) ,
        email : z.string({}).email({message : "Invalid email address"}) ,
        password : z.string({}) ,
        phoneNumber: z.string({ required_error: "Phone number is required" }).regex(/^01[0-9]{9}$/, "Invalid Bangladeshi phone number"),
    })
})

export const userValidations = {
    registerUserValidationSchema ,
}
