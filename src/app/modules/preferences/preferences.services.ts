
import { TDietaryPreference } from "./preferences.interfaces"

const createDietaryPreferenceIntoDb = async (userId : string , payload : TDietaryPreference) => {
    console.log(userId , payload);
    return null ;
}

export const dietaryPreferenceServices = {
    createDietaryPreferenceIntoDb
}
