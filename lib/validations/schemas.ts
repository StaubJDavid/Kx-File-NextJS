const Joi = require('joi');

export const joi_email = Joi.string().email().required();
export const joi_username = Joi.string().required().min(2);
//export const joi_password = Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?#$%&()"\'\[\\\]*+,-./{}~])(?=.{8,})')).required().messages({'string.pattern.base': `Password is bad`});;
export const joi_password = Joi.string().required().min(4);