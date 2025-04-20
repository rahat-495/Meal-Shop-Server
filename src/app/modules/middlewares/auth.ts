
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TUserRole } from "../user/user.interfaces";
import { usersModel } from "../auth/auth.modules";

const auth = (...requiredRoles : TUserRole[]) => {
    return catchAsync(async (req : Request , res : Response , next : NextFunction) => {
        const token = req.headers.authorization ;
        
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized !") ;
        }
        
        let decoded = {} as JwtPayload;
        try {
            decoded = jwt.verify(token as string , config.jwtAccessSecret as string) as JwtPayload ;
        } catch (error) {
            throw new AppError(401 , "Unauthorized !") ;
        }
        const role = decoded.role ;

        const user = await usersModel.findOne({email : decoded?.email}) ;
        
        if(!user){
            throw new AppError(404 , "The user is not found !") ;
        }

        const isDeleted = user?.isblocked ;
        if(isDeleted){
            throw new AppError(400 , "The user is blocked !") ;
        }

        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized !") ;
        }
        
        req.user = decoded as JwtPayload ;

        next() ;
    })
}

export default auth ;
