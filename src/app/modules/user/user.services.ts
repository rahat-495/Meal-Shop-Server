
import { TRegisterUser } from "../auth/auth.interfaces";
import { usersModel } from "./user.model";

const getMyDataFromDb = async (id : string) => {
    const result = await usersModel.findById(id).select("-password -__v") ;
    return result ;
}

const updateProfileIntoDb = async (id : string , paylaod : Partial<TRegisterUser>) => {
    const result = await usersModel.findByIdAndUpdate(id , paylaod , {new : true}).select("-password -__v") ;
    return result ;
}

export const userServices = {
    getMyDataFromDb ,
    updateProfileIntoDb ,
}
