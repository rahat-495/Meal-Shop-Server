
import config from "../../config";
import AppError from "../../errors/AppErrors";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { usersModel } from "../user/user.model";
import { TRegisterUser, TUserLogin } from "./auth.interfaces";
import jwt from "jsonwebtoken" ;
import bcrypt from "bcrypt" ;
import http from "http-status-codes" ;

const createUserIntoDb = async (file : any , payload : TRegisterUser) => {
    const isUserAlreadyExist = await usersModel.findOne({email : payload?.email , phoneNumber : payload?.phoneNumber}) ;
    if(isUserAlreadyExist){
        throw new AppError(400 , "User already exist !") ;
    }

    if(file){
        const path = file?.path ;
        const imageName = `${payload?.phoneNumber}${payload?.name}` ;
        const {secure_url} = await sendImageToCloudinary(imageName , path) as any ;
        payload.profileImage = secure_url ;
    }
    
    const result = await usersModel.create(payload) ;
    
    if(!result){
        throw new AppError(400 , "User creation failed !") ;
    }

    const jwtPayload = { email : result?.email , role : result?.role , userId : result?._id , phoneNumber : result?.phoneNumber } ;
    const accessToken = await jwt.sign(jwtPayload , config.jwtAccessSecret as string , {expiresIn : "1d"}) ;
    const refreshToken = await jwt.sign(jwtPayload , config.jwtRefreshSecret as string , {expiresIn : "365d"}) ;
    return {accessToken , refreshToken} ;
}

const loginUser = async (payload : TUserLogin) => {
    const isUserExist = await usersModel.findOne({ $or : [ {email : payload?.loginCredentials} , {phoneNumber : payload?.loginCredentials} ] }).select("+password") ;
    if(!isUserExist){
        throw new AppError(http.NOT_FOUND , "User not found !") ;
    }
    
    if(isUserExist?.isblocked){
        throw new AppError(http.FORBIDDEN , "User is blocked !") ;
    }

    const isPasswordMatched = await bcrypt.compare(payload.password , isUserExist.password) ;
    if(!isPasswordMatched){
        throw new AppError(http.UNAUTHORIZED , "User not found !") ;
    }

    const jwtPayload = { email : isUserExist?.email , role : isUserExist?.role , userId : isUserExist?._id , phoneNumber : isUserExist?.phoneNumber } ;
    const accessToken = await jwt.sign(jwtPayload , config.jwtAccessSecret as string , {expiresIn : "1d"}) ;
    const refreshToken = await jwt.sign(jwtPayload , config.jwtRefreshSecret as string , {expiresIn : "365d"}) ;
    return {accessToken , refreshToken} ;
}

export const authServices = {
    loginUser ,
    createUserIntoDb ,
}
