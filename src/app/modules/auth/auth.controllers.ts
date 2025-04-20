
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";
import config from "../../config";

const registerUser : RequestHandler = catchAsync(async (req , res) => {
    const result = await authServices.createUserIntoDb(req.file , req.body) ;
    res.cookie("refreshToken" , result.refreshToken , { secure : config.nodeEnv === "production" , httpOnly : true , sameSite : "strict" , maxAge : 1000 * 60 * 60 * 24 * 365}) ;
    if(result){
        sendResponse<object>(res , {data : {accessToken : result?.accessToken} , statusCode : 200 , success : true , message : "User register success full !"}) ;
    }
})

export const authControllers = {
    registerUser ,
}
