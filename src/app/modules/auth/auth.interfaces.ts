
export type TRegisterUser = {
    name : string ;
    email : string ;
    password : string ;
    phoneNumber : string ;
    isblocked : boolean ;
    role : string ;
    profileImage : string ;
}

export type TUserLogin = {
    password : string ;
    loginCredentials : string ;
}
