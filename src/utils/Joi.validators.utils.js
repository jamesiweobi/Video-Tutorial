const Joi = require('joi');

const signupValidation = (newUser) => {
    const userSchema = Joi.object({
        username: Joi.string().min(2).required().messages({
            'username.base': `Please enter a valid username`,
            'username.empty': `Please enter a valid username`,
            'any.required': `Please enter a valid username`,
            'string.username': 'Please enter a valid username',
        }),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(6)
            .required()
            .messages({
                'password.base': `Password must be a string`,
                'password.empty': `Password cannot be empty`,
                'any.required': `Please enter a valid password`,
                'string.min': 'Password cannot be less than 6 characters',
            }),
        repeatPassword: Joi.ref('password'),
    });

    return userSchema.validate(newUser);
};

module.exports = {
    signupValidation,
};
