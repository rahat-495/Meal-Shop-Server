
import { RequestHandler } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.services";
import { JwtPayload } from "jsonwebtoken";

const getMyData : RequestHandler = catchAsync(async (req , res) => {
    const result = await userServices.getMyDataFromDb(req.user.userId) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "User login success full !"}) ;
    }
})

const updateProfile : RequestHandler = catchAsync(async (req , res) => {
    const result = await userServices.updateProfileIntoDb(req.user.userId , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "User profile updated success full !"}) ;
    }
})

export const userControllers = {
    getMyData ,
    updateProfile ,
}
