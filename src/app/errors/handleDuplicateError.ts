
import { TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any) : TGenericErrorResponse => {
    const statusCode = 400 ;
    const match = err.message.match(/"([^"]*)"/) ;
    const extractedMessage = match && match[1] ;
    const errorSources = [{ path : "" , message : `${extractedMessage} is already axist !` }] ;
    return {
        statusCode ,
        message : "Duplicate Error" ,
        errorSources ,
    }
}

export default handleDuplicateError;
