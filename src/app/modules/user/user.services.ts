import { usersModel } from "./user.model";

const getMyDataFromDb = async (id : string) => {
    const result = await usersModel.findById(id).select("-password -__v") ;
    return result ;
}

export const userServices = {
    getMyDataFromDb ,
}
