
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";

const registerUser : RequestHandler = catchAsync(async (req , res) => {
    const result = await authServices.createUserIntoDb(req.file , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "User register success full !"}) ;
    }
})

export const authControllers = {
    registerUser ,
}
