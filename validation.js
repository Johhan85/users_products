const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        email : Joi.string().min(5).max(30).email().required(),
        password : Joi.string().min(6).max(20).required()
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email : Joi.string().min(5).max(30).email().required(),
        password : Joi.string().min(6).max(20).required()
    });
    return schema.validate(data);
}

const productValidation = (data) => {
    const schema = Joi.object({
        name : Joi.string().min(1).max(25).required(),
        description : Joi.string().min(2).max(25).required(),
        category_id : Joi.number().required(),
        price : Joi.number().required() 
    });
    return schema.validate(data);
}

module.exports = {
    registerValidation : registerValidation,
    loginValidation : loginValidation,
    productValidation : productValidation
};