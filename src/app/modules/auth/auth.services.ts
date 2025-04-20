
import AppError from "../../errors/AppErrors";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { usersModel } from "../user/user.modules";
import { TRegisterUser } from "./auth.interfaces";

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
    return result ;
}

export const authServices = {
    createUserIntoDb ,
}
