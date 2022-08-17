import Joi from 'joi';
import {joi_email, joi_password, joi_username} from './schemas';

const registerValidationObject = Joi.object({
    email: joi_email,
    username: joi_username,
    password: joi_password
});

const loginValidationObject = Joi.object({
    email: joi_email,
    password: joi_password
});

class authValidation {
    constructor(){};

    static registerValidation(data){
        const { error, value } = registerValidationObject.validate({ 
            email: data.email,
            username: data.username,
            password: data.password
        },{abortEarly: false});
    
        const errors:any = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "email": errors.email = "Wrong email format";break;
                    case "username": errors.username = "Wrong username format";break;
                    case "password": errors.password = "Wrong password format";break;
                }
            })

            throw errors;
        }
    };

    static loginValidation(data){
        const { error, value } = loginValidationObject.validate({ 
            email: data.email,
            password: data.password
        },{abortEarly: false});
    
        const errors:any = new Error("Login validation error");
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "email": errors.email = "Wrong email format";break;
                    case "password": errors.password = "Wrong password format";break;
                }
            })

            throw errors;
        }    
    };
}

module.exports = authValidation;