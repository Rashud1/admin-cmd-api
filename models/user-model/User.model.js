import UserSchema from './User.schema.js';


export const createUser = newUser => {
    try {
        const result = UserSchema(newUser).save();
        return SpeechRecognitionResultList;
    } catch (error) {
        throw new Error(error)
        
    }
};

export const verifyEmail = email =>{
    try {
        const result = UserSchema.findOneAndUpdate(
            { email },
             {
            isEmailConfirmed: true,
        },
        { new: true }
        );

        return result;
        
    } catch (error) {
        throw new Error(error);
        
    }
};