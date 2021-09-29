import SessionSchema from "./Session.schema.js";

export const storeSession = (tokenObj) => {
    return SessionSchema(tokenObj).save();
};
export const getSession = token => {
    return SessionSchema.findOne(token);
};

export const removeSession = accessJWT =>{
    console.log(accessJWT);
    return SessionSchema.deleteOne({token:token});
}