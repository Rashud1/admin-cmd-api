import SessionSchema from './Session.schema.js';
import { randomNumberGenerator } from '../../../utils/randomGenerator.js'



const pinLength = 6
export const createUniqueEmailConfirmation = async email => {
    
    try {
        const pin = randomNumberGenerato(pinLength);
        if(!pin || !email) {
            return false
        }

        const newEmailValidation = {
            pin,
            email
        };

        const result = await SessionSchema(newEmailValidation).save();
       
        return result;
        SessionSchema()

        
    } catch (error) {
        throw new Error(error)
        
    }
};

export const findAdminEmailVerification = async (filterObj) =>{
    try {
        const result = await SessionSchema.findOne(filterObj); /// this filter obj will have pin and email
       
        return result;
        
    } catch (error) {
        throw new Error(error);
        
    }
};

export const deleteInfo = async filterObj =>{
    try {
        const reult = await SessionSchema.findOneAndDelete(filterObj);
        return result;
   
    } catch (error) {
        throw new Error(error);
        
    }
};
