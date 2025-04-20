
import { model, Schema } from "mongoose";
import { TRegisterUser } from "../auth/auth.interfaces";
import bcript from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TRegisterUser>({
    name : {
        type : String ,
        required : true ,
    },
    email : {
        type : String ,
        required : true ,
        unique : true ,
    },
    password : {
        type : String ,
        required : true ,
    },
    profileImage : {
        type : String ,
        required : true ,
    },
    phoneNumber : {
        type : Number ,
        required : true ,
        unique : true ,
    },
    isblocked : {
        type : Boolean ,
        default : false ,
    },
    role : {
        type : String ,
        enum : ["admin" , "user"] ,
        default : "user" ,
    },
},{
    timestamps : true ,
})

userSchema.pre("save" , async function(next){
    const user = this ;
    user.password = await bcript.hash(user.password , Number(config.bcryptSaltRounds)) ;
    next() ;
})

userSchema.post("save" , async function(doc , next){
    doc.password = "" ;
    next() ;
})

export const usersModel = model<TRegisterUser>("user" , userSchema) ;
