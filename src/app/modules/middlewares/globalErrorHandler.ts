
import e, { ErrorRequestHandler, NextFunction } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../../interface/error";
import config from "../../config";
import handleZodError from "../../errors/HandleZodError";
import handleValidationError from "../../errors/HandleValidationError";
import handleCastError from "../../errors/handleCastError";
import handleDuplicateError from "../../errors/handleDuplicateError";
import AppError from "../../errors/AppErrors";

const globalErrorHandler : ErrorRequestHandler = (err , req , res , next : NextFunction) : any => {

    let statusCode = 500 ;
    let message = "some thing wen't wrong" ;
    let errorSources : TErrorSources = [{ path : "" , message : "Some thing went wrong" }] ;

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;
    }
    else if(err.name === "ValidationError"){
        const simplifiedError = handleValidationError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;    
    }
    else if(err.name === "CastError"){
        const simplifiedError = handleCastError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;    
    }
    else if(err.code === 11000){
        const simplifiedError = handleDuplicateError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;    
    }
    else if(err instanceof AppError){
        statusCode = err.statusCode ;
        message = err.message ;
        errorSources = [{ path : "" , message : err.message }] ;    
    }
    else if(err instanceof Error){
        message = err.message ;
        errorSources = [{ path : "" , message : err.message }] ;    
    }

    return res.status(statusCode).json({
        success : false ,
        message ,
        errorSources ,
        error : config.nodeEnv === "development" ? err : null ,
        stack : config.nodeEnv === "development" ? err.stack : null ,
    })
}

export default globalErrorHandler ;
