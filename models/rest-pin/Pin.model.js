import PinSchema from './Pin.schema.js';
import { randomNumberGenerator } from '../../utils/randomGenerator.js'

const pinLength = 6
export const createUniqueEmailConfirmation = async email => {
    
    try {
        const pin = randomNumberGenerator(pinLength);
        if(!pin || !email) {
            return false
        }

        const newEmailValidation = {
            pin,
            email,
        };

        const result = await PinSchema(newEmailValidation).save();
       
        return result;
       } catch (error) {
        throw new Error(error)
        
    }
};

export const findAdminEmailVerification = async (filterObj) =>{
    try {
        const result = await SessionSchema.findOne({
            otp:"123456",
            email: "asa@gmail.com"
        }); /// this filter obj will have pin and email
       
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

export const createUniqueOtp = async ({email, type}) => {
    
    try {
        const pin = randomNumberGenerator(pinLength);
        if(!pin || !email) {
            return false
        }

        const newOtp = {
            pin,
            email,
            type,
        };

        const result = await PinSchema(newOtp).save();
       
        return result;
       } catch (error) {
        throw new Error(error)
        
    }
};
